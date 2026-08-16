import fs from "node:fs";
import path from "node:path";
import { ideas } from "@/data/portfolio";
import {
  assertUniquePublicationKeys,
  isPublicationArtifactFile,
  isPublicPublication,
  LAB_CONFIG_FILE,
  labContentError,
  parseJsonSource,
  parseLabConfig,
  parsePublication,
} from "./contract.mjs";
import { LabConfig, LabPublication, PublicationSummary } from "./types";

const labContentDirectory = path.join(process.cwd(), "content", "lab");
const publicDirectory = path.join(process.cwd(), "public");
const labConfigFile = path.join(labContentDirectory, LAB_CONFIG_FILE);

function compareText(left: string, right: string): number {
  if (left === right) {
    return 0;
  }

  return left < right ? -1 : 1;
}

function comparePublicationMetadata(
  left: Pick<PublicationSummary, "date" | "id" | "slug">,
  right: Pick<PublicationSummary, "date" | "id" | "slug">,
): number {
  const dateOrder = compareText(right.date ?? "", left.date ?? "");

  if (dateOrder !== 0) {
    return dateOrder;
  }

  const idOrder = compareText(left.id, right.id);
  return idOrder !== 0 ? idOrder : compareText(left.slug, right.slug);
}

function readJson(filePath: string, fileName: string): unknown {
  let source: string;

  try {
    source = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw labContentError(fileName, `Unable to read file: ${detail}`);
  }

  return parseJsonSource(source, fileName) as unknown;
}

export function getLabConfig(): LabConfig {
  return parseLabConfig(readJson(labConfigFile, LAB_CONFIG_FILE), LAB_CONFIG_FILE) as LabConfig;
}

export function getAllLabPublications(): LabPublication[] {
  const entries = fs
    .readdirSync(labContentDirectory)
    .filter(isPublicationArtifactFile)
    .sort(compareText)
    .map((fileName) => ({
      fileName,
      publication: parsePublication(readJson(path.join(labContentDirectory, fileName), fileName), fileName, {
        publicDirectory,
      }) as LabPublication,
    }));

  assertUniquePublicationKeys(
    entries.map(({ fileName, publication }) => ({
      fileName,
      id: publication.metadata.id,
      slug: publication.metadata.slug,
    })),
  );

  return entries.map(({ publication }) => publication).sort((left, right) =>
    comparePublicationMetadata(left.metadata, right.metadata),
  );
}

export function getPublishedLabPublications(): LabPublication[] {
  return getAllLabPublications().filter(isPublicPublication);
}

export function getLabPublicationBySlug(slug: string): LabPublication | undefined {
  return getPublishedLabPublications().find((publication) => publication.metadata.slug === slug);
}

function toPublicationSummary(publication: LabPublication): PublicationSummary {
  return {
    ...publication.metadata,
    href: `/lab/${publication.metadata.slug}`,
    source: "lab-artifact",
  };
}

function adaptIdeaArchive(): PublicationSummary[] {
  return ideas.map<PublicationSummary>((idea) => ({
    id: idea.id,
    slug: idea.href.split("/").filter(Boolean).at(-1) ?? idea.id.toLowerCase(),
    title: idea.title,
    description: idea.description,
    type: "Idea",
    project: { name: "Independent research" },
    tags: [idea.type, idea.theme],
    outcome: {
      classification: "not-applicable",
      summary: "Retained idea archive entry; no experimental result is claimed.",
    },
    status: "published",
    reviewStatus: "approved",
    href: idea.href,
    source: "idea-archive",
  }));
}

export function getLabPublicationCollections() {
  const publishedArtifacts = getPublishedLabPublications();
  const artifactPublications = publishedArtifacts.map(toPublicationSummary);
  const ideaPublications = adaptIdeaArchive();

  // Lab artifacts and retained Idea adapters still share one global namespace, even though their public registers
  // are now presented separately.
  assertUniquePublicationKeys(
    [...artifactPublications, ...ideaPublications].map((publication) => ({
      fileName:
        publication.source === "lab-artifact"
          ? `content/lab/${publication.slug}.json`
          : `Idea adapter ${publication.href}`,
      id: publication.id,
      slug: publication.slug,
    })),
  );

  // Archive placement is derived from normalized provenance, independently of publication taxonomy.
  const current = publishedArtifacts
    .filter((publication) => publication.provenance.origin !== "historical-migration")
    .map(toPublicationSummary)
    .sort(comparePublicationMetadata);
  const preLabEngineering = publishedArtifacts
    .filter((publication) => publication.provenance.origin === "historical-migration")
    .map(toPublicationSummary)
    .sort(comparePublicationMetadata);

  return {
    current,
    preLabEngineering,
    ideas: ideaPublications.sort(comparePublicationMetadata),
  };
}

export function getPublicationRegister(): PublicationSummary[] {
  return getLabPublicationCollections().current;
}

export function getPreLabEngineeringPublications(): PublicationSummary[] {
  return getLabPublicationCollections().preLabEngineering;
}

export function getIdeasArchivePublications(): PublicationSummary[] {
  return getLabPublicationCollections().ideas;
}

export function getHomepageLabPublications(limit = 2): PublicationSummary[] {
  return getPublicationRegister().slice(0, limit);
}

export function calculatePublicationReadTime(publication: LabPublication): number {
  const readableContent = JSON.stringify({
    description: publication.metadata.description,
    outcome: publication.metadata.outcome.summary,
    quote: publication.quote,
    provenance: publication.provenance.summary,
    sections: publication.sections,
  })
    .replace(/[{}\[\]",:]/g, " ")
    .trim();
  const wordCount = readableContent === "" ? 0 : readableContent.split(/\s+/).length;

  return Math.max(1, Math.ceil(wordCount / 200));
}

export function formatPublicationDate(value?: string): string {
  if (!value) {
    return "UNDATED";
  }

  const [year, month, day] = value.split("-");
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const monthName = monthNames[Number(month) - 1];

  if (!monthName || !year) {
    return value.toUpperCase();
  }

  return day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
}
