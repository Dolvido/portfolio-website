import fs from "node:fs";
import net from "node:net";
import path from "node:path";

export const LAB_SCHEMA_VERSION = 1;
export const LAB_CONFIG_FILE = "lab.config.json";
export const LAB_MEDIA_PREFIX = "/images/lab/";

export function isPublicationArtifactFile(fileName) {
  return fileName.endsWith(".json") && fileName !== LAB_CONFIG_FILE;
}

export function isPublicPublication(publication) {
  return publication.metadata.status === "published" && publication.metadata.reviewStatus === "approved";
}

const PUBLICATION_TYPES = new Set([
  "Lab Report",
  "Experiment",
  "Project Log",
  "Engineering Note",
  "Field Note",
  "Idea",
]);
const OUTCOME_CLASSIFICATIONS = new Set([
  "supported",
  "not-supported",
  "inconclusive",
  "ongoing",
  "not-applicable",
]);
const PROVENANCE_ORIGINS = new Set(["human-authored", "historical-migration", "reviewed-candidate"]);
const IMAGE_EXTENSIONS = /\.(?:avif|gif|jpe?g|png|webp)$/i;

export function labContentError(fileName, message) {
  return new Error(`[Lab content: ${fileName}] ${message}`);
}

export function parseJsonSource(source, fileName) {
  try {
    return JSON.parse(source);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw labContentError(fileName, `Invalid JSON: ${detail}`);
  }
}

function fail(fileName, message) {
  throw labContentError(fileName, message);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireRecord(value, fileName, field) {
  if (!isRecord(value)) {
    fail(fileName, `"${field}" must be an object.`);
  }

  return value;
}

function requireExactKeys(record, allowedKeys, fileName, field) {
  const allowed = new Set(allowedKeys);
  const unknownKeys = Object.keys(record).filter((key) => !allowed.has(key)).sort();

  if (unknownKeys.length > 0) {
    fail(
      fileName,
      `"${field}" contains unknown ${unknownKeys.length === 1 ? "property" : "properties"}: ${unknownKeys
        .map((key) => `"${key}"`)
        .join(", ")}.`,
    );
  }
}

function requireString(value, fileName, field) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(fileName, `"${field}" must be a non-empty string.`);
  }

  return value;
}

function optionalString(value, fileName, field) {
  return value === undefined ? undefined : requireString(value, fileName, field);
}

function requireBoolean(value, fileName, field) {
  if (typeof value !== "boolean") {
    fail(fileName, `"${field}" must be a boolean.`);
  }

  return value;
}

function optionalBoolean(value, fileName, field) {
  return value === undefined ? undefined : requireBoolean(value, fileName, field);
}

function requireArray(value, fileName, field, { allowEmpty = false } = {}) {
  if (!Array.isArray(value)) {
    fail(fileName, `"${field}" must be an array.`);
  }

  if (!allowEmpty && value.length === 0) {
    fail(fileName, `"${field}" must contain at least one item.`);
  }

  return value;
}

function requireStringArray(value, fileName, field) {
  const items = requireArray(value, fileName, field);

  return items.map((item, index) => requireString(item, fileName, `${field}[${index}]`));
}

function requireSlug(value, fileName, field) {
  const slug = requireString(value, fileName, field);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(fileName, `"${field}" must use lowercase kebab-case.`);
  }

  return slug;
}

function requireStableId(value, fileName, field) {
  const id = requireString(value, fileName, field);

  if (!/^[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*$/.test(id)) {
    fail(fileName, `"${field}" must be a stable identifier containing only letters, numbers, dots, hyphens, or underscores.`);
  }

  return id;
}

function requireDate(value, fileName, field) {
  const date = requireString(value, fileName, field);
  const match = date.match(/^(\d{4})-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/);

  if (!match) {
    fail(fileName, `"${field}" must use YYYY-MM or YYYY-MM-DD.`);
  }

  if (match[3]) {
    const parsed = new Date(`${date}T00:00:00.000Z`);

    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
      fail(fileName, `"${field}" must be a valid calendar date.`);
    }
  }

  return date;
}

function requireTimestamp(value, fileName, field) {
  const timestamp = requireString(value, fileName, field);

  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(timestamp)) {
    fail(fileName, `"${field}" must be an RFC 3339 timestamp with a timezone.`);
  }

  if (Number.isNaN(Date.parse(timestamp))) {
    fail(fileName, `"${field}" must be a valid timestamp.`);
  }

  return timestamp;
}

function requirePositiveInteger(value, fileName, field) {
  if (!Number.isInteger(value) || value <= 0) {
    fail(fileName, `"${field}" must be a positive integer.`);
  }

  return value;
}

function assertUniqueValues(values, fileName, field) {
  const seen = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      fail(fileName, `"${field}" contains duplicate value "${value}".`);
    }

    seen.add(value);
  }
}

function decodeForSafety(value, fileName, field) {
  let decoded = value;

  for (let index = 0; index < 8; index += 1) {
    let next;

    try {
      next = decodeURIComponent(decoded);
    } catch {
      fail(fileName, `"${field}" contains malformed URL encoding.`);
    }

    if (next === decoded) {
      return decoded;
    }

    decoded = next;
  }

  fail(fileName, `"${field}" is excessively URL-encoded.`);
}

function assertNoPathHazards(value, fileName, field) {
  const decoded = decodeForSafety(value, fileName, field);

  if (/[\\]/.test(value) || /[\\]/.test(decoded)) {
    fail(fileName, `"${field}" must not contain backslashes or UNC paths.`);
  }

  if (value.includes("..") || decoded.includes("..")) {
    fail(fileName, `"${field}" must not contain ".." path segments.`);
  }

  if (/^\/?[A-Za-z]:[\/]/.test(decoded)) {
    fail(fileName, `"${field}" must not contain a Windows drive path.`);
  }

  if (/^\/(?:Users|home|tmp|private|var\/folders|etc|proc|sys)(?:\/|$)/i.test(decoded)) {
    fail(fileName, `"${field}" must not contain a local filesystem path.`);
  }

  if (/[\u0000-\u001f\u007f]/.test(value) || /[\u0000-\u001f\u007f]/.test(decoded)) {
    fail(fileName, `"${field}" must not contain control characters.`);
  }

  return decoded;
}

function isNonPublicIpv4(hostname) {
  const parts = hostname.split(".").map(Number);
  const [first, second] = parts;

  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 0) ||
    (first === 192 && second === 168) ||
    (first === 198 && (second === 18 || second === 19)) ||
    first >= 224
  );
}

function expandIpv6(hostname) {
  const [head = "", tail = ""] = hostname.split("::");
  const headParts = head === "" ? [] : head.split(":");
  const tailParts = tail === "" ? [] : tail.split(":");
  const missing = 8 - headParts.length - tailParts.length;

  return [...headParts, ...Array(Math.max(0, missing)).fill("0"), ...tailParts].map((part) =>
    Number.parseInt(part || "0", 16),
  );
}

function isNonPublicIpv6(hostname) {
  const parts = expandIpv6(hostname);
  const first = parts[0];
  const isUnspecified = parts.every((part) => part === 0);
  const isLoopback = parts.slice(0, 7).every((part) => part === 0) && parts[7] === 1;
  const isUniqueLocal = (first & 0xfe00) === 0xfc00;
  const isLinkLocal = (first & 0xffc0) === 0xfe80;
  const isMulticast = (first & 0xff00) === 0xff00;
  const isDocumentation = first === 0x2001 && parts[1] === 0x0db8;
  const isIpv4Mapped = parts.slice(0, 5).every((part) => part === 0) && parts[5] === 0xffff;

  if (isIpv4Mapped) {
    const ipv4 = `${parts[6] >> 8}.${parts[6] & 0xff}.${parts[7] >> 8}.${parts[7] & 0xff}`;
    return isNonPublicIpv4(ipv4);
  }

  return isUnspecified || isLoopback || isUniqueLocal || isLinkLocal || isMulticast || isDocumentation;
}

function assertPublicHostname(rawHostname, fileName, field) {
  const hostname = rawHostname.replace(/^\[|\]$/g, "").replace(/\.$/, "").toLowerCase();
  const localNames = ["localhost", "local", "internal", "lan", "home", "localdomain"];
  const addressType = net.isIP(hostname);

  if (
    hostname === "" ||
    (addressType === 0 &&
      (!hostname.includes(".") || localNames.some((name) => hostname === name || hostname.endsWith(`.${name}`))))
  ) {
    fail(fileName, `"${field}" must not target localhost or a private-network hostname.`);
  }

  if ((addressType === 4 && isNonPublicIpv4(hostname)) || (addressType === 6 && isNonPublicIpv6(hostname))) {
    fail(fileName, `"${field}" must not target a loopback, private, or non-public IP address.`);
  }
}

export function requireSafePublicReference(value, fileName, field) {
  const reference = requireString(value, fileName, field);

  if (reference !== reference.trim()) {
    fail(fileName, `"${field}" must not have leading or trailing whitespace.`);
  }

  const decoded = assertNoPathHazards(reference, fileName, field);

  if (reference.startsWith("//") || decoded.startsWith("//")) {
    fail(fileName, `"${field}" must not be a protocol-relative URL.`);
  }

  if (reference.startsWith("/")) {
    return reference;
  }

  if (!/^https:\/\/[^/]/.test(reference)) {
    fail(fileName, `"${field}" must be an HTTPS URL or a site-root-relative path beginning with "/".`);
  }

  let parsed;

  try {
    parsed = new URL(reference);
  } catch {
    fail(fileName, `"${field}" must be an HTTPS URL or a site-root-relative path beginning with "/".`);
  }

  if (parsed.protocol !== "https:") {
    fail(fileName, `"${field}" must use HTTPS.`);
  }

  if (parsed.username !== "" || parsed.password !== "") {
    fail(fileName, `"${field}" must not contain URL credentials.`);
  }

  assertPublicHostname(parsed.hostname, fileName, field);
  return reference;
}

function requireLocalLabImage(value, fileName, field, publicDirectory) {
  const src = requireSafePublicReference(value, fileName, field);

  if (!src.startsWith(LAB_MEDIA_PREFIX)) {
    fail(fileName, `"${field}" must be a site-local path beneath "${LAB_MEDIA_PREFIX}".`);
  }

  if (src.includes("?") || src.includes("#")) {
    fail(fileName, `"${field}" must not contain a query string or fragment.`);
  }

  const decoded = decodeForSafety(src, fileName, field);

  if (!IMAGE_EXTENSIONS.test(decoded)) {
    fail(fileName, `"${field}" must reference a supported raster image file.`);
  }

  const mediaDirectory = path.resolve(publicDirectory, "images", "lab");
  const relativePath = decoded.slice(LAB_MEDIA_PREFIX.length);
  const candidate = path.resolve(mediaDirectory, ...relativePath.split("/"));
  const relative = path.relative(mediaDirectory, candidate);

  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    fail(fileName, `"${field}" escapes the public Lab media directory.`);
  }

  let candidateStats;

  try {
    candidateStats = fs.statSync(candidate);
  } catch {
    fail(fileName, `"${field}" references missing public media "${src}".`);
  }

  if (!candidateStats.isFile()) {
    fail(fileName, `"${field}" must reference a file beneath "${LAB_MEDIA_PREFIX}".`);
  }

  const realMediaDirectory = fs.realpathSync(mediaDirectory);
  const realCandidate = fs.realpathSync(candidate);
  const realRelative = path.relative(realMediaDirectory, realCandidate);

  if (realRelative === "" || realRelative.startsWith("..") || path.isAbsolute(realRelative)) {
    fail(fileName, `"${field}" resolves outside the public Lab media directory.`);
  }

  return src;
}

function parseProject(value, fileName) {
  const field = "metadata.project";
  const project = requireRecord(value, fileName, field);
  requireExactKeys(project, ["id", "name", "href"], fileName, field);

  return {
    id: project.id === undefined ? undefined : requireStableId(project.id, fileName, `${field}.id`),
    name: requireString(project.name, fileName, `${field}.name`),
    href:
      project.href === undefined
        ? undefined
        : requireSafePublicReference(project.href, fileName, `${field}.href`),
  };
}

function parseOutcome(value, fileName) {
  const field = "metadata.outcome";
  const outcome = requireRecord(value, fileName, field);
  requireExactKeys(outcome, ["classification", "summary"], fileName, field);
  const classification = requireString(outcome.classification, fileName, `${field}.classification`);

  if (!OUTCOME_CLASSIFICATIONS.has(classification)) {
    fail(
      fileName,
      `"${field}.classification" must be one of: ${[...OUTCOME_CLASSIFICATIONS].join(", ")}.`,
    );
  }

  return {
    classification,
    summary: requireString(outcome.summary, fileName, `${field}.summary`),
  };
}

function parsePublicReference(value, fileName, field) {
  const reference = requireRecord(value, fileName, field);
  requireExactKeys(reference, ["id", "label", "href", "kind", "note"], fileName, field);

  return {
    id: requireSlug(reference.id, fileName, `${field}.id`),
    label: requireString(reference.label, fileName, `${field}.label`),
    href: requireSafePublicReference(reference.href, fileName, `${field}.href`),
    kind: optionalString(reference.kind, fileName, `${field}.kind`),
    note: optionalString(reference.note, fileName, `${field}.note`),
  };
}

function parseReferenceArray(value, fileName, field) {
  const references = requireArray(value, fileName, field).map((item, index) =>
    parsePublicReference(item, fileName, `${field}[${index}]`),
  );
  assertUniqueValues(
    references.map((reference) => reference.id),
    fileName,
    `${field} IDs`,
  );
  return references;
}

function parseProvenance(value, fileName) {
  const field = "provenance";
  const provenance = requireRecord(value, fileName, field);
  requireExactKeys(
    provenance,
    ["origin", "summary", "generatedAt", "sourceRevision", "publicReferences"],
    fileName,
    field,
  );
  const origin = requireString(provenance.origin, fileName, `${field}.origin`);

  if (!PROVENANCE_ORIGINS.has(origin)) {
    fail(fileName, `"${field}.origin" must be one of: ${[...PROVENANCE_ORIGINS].join(", ")}.`);
  }

  const sourceRevision = optionalString(provenance.sourceRevision, fileName, `${field}.sourceRevision`);

  if (sourceRevision !== undefined && !/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(sourceRevision)) {
    fail(fileName, `"${field}.sourceRevision" must be a public revision token, not a path or URL.`);
  }

  return {
    origin,
    summary: requireString(provenance.summary, fileName, `${field}.summary`),
    generatedAt:
      provenance.generatedAt === undefined
        ? undefined
        : requireTimestamp(provenance.generatedAt, fileName, `${field}.generatedAt`),
    sourceRevision,
    publicReferences:
      provenance.publicReferences === undefined
        ? undefined
        : parseReferenceArray(provenance.publicReferences, fileName, `${field}.publicReferences`),
  };
}

function parseMetadata(value, fileName) {
  const field = "metadata";
  const metadata = requireRecord(value, fileName, field);
  requireExactKeys(
    metadata,
    [
      "id",
      "slug",
      "title",
      "description",
      "date",
      "type",
      "project",
      "tags",
      "outcome",
      "status",
      "reviewStatus",
      "evidence",
    ],
    fileName,
    field,
  );

  const type = requireString(metadata.type, fileName, `${field}.type`);

  if (!PUBLICATION_TYPES.has(type)) {
    fail(fileName, `"${field}.type" must be one of: ${[...PUBLICATION_TYPES].join(", ")}.`);
  }

  const status = requireString(metadata.status, fileName, `${field}.status`);

  if (status !== "draft" && status !== "published") {
    fail(fileName, `"${field}.status" must be either "draft" or "published".`);
  }

  const reviewStatus = requireString(metadata.reviewStatus, fileName, `${field}.reviewStatus`);

  if (reviewStatus !== "pending" && reviewStatus !== "approved") {
    fail(fileName, `"${field}.reviewStatus" must be either "pending" or "approved".`);
  }

  if (status === "published" && reviewStatus !== "approved") {
    fail(fileName, 'A publication with "metadata.status" set to "published" requires "metadata.reviewStatus" to be "approved".');
  }

  const tags = metadata.tags === undefined ? undefined : requireStringArray(metadata.tags, fileName, `${field}.tags`);

  if (tags) {
    assertUniqueValues(tags, fileName, `${field}.tags`);
  }

  return {
    id: requireStableId(metadata.id, fileName, `${field}.id`),
    slug: requireSlug(metadata.slug, fileName, `${field}.slug`),
    title: requireString(metadata.title, fileName, `${field}.title`),
    description: requireString(metadata.description, fileName, `${field}.description`),
    date: requireDate(metadata.date, fileName, `${field}.date`),
    type,
    project: metadata.project === undefined ? undefined : parseProject(metadata.project, fileName),
    tags,
    outcome: parseOutcome(metadata.outcome, fileName),
    status,
    reviewStatus,
    evidence:
      metadata.evidence === undefined
        ? undefined
        : parseReferenceArray(metadata.evidence, fileName, `${field}.evidence`),
  };
}

function parseBlock(value, fileName, field, publicDirectory) {
  const block = requireRecord(value, fileName, field);
  const type = requireString(block.type, fileName, `${field}.type`);

  switch (type) {
    case "paragraph":
      requireExactKeys(block, ["type", "text"], fileName, field);
      return { type, text: requireString(block.text, fileName, `${field}.text`) };
    case "list":
      requireExactKeys(block, ["type", "items", "ordered"], fileName, field);
      return {
        type,
        items: requireStringArray(block.items, fileName, `${field}.items`),
        ordered: optionalBoolean(block.ordered, fileName, `${field}.ordered`),
      };
    case "code":
      requireExactKeys(block, ["type", "code", "language", "caption"], fileName, field);
      return {
        type,
        code: requireString(block.code, fileName, `${field}.code`),
        language: optionalString(block.language, fileName, `${field}.language`),
        caption: optionalString(block.caption, fileName, `${field}.caption`),
      };
    case "image":
      requireExactKeys(block, ["type", "src", "alt", "caption", "width", "height"], fileName, field);
      return {
        type,
        src: requireLocalLabImage(block.src, fileName, `${field}.src`, publicDirectory),
        alt: requireString(block.alt, fileName, `${field}.alt`),
        caption: optionalString(block.caption, fileName, `${field}.caption`),
        width: block.width === undefined ? undefined : requirePositiveInteger(block.width, fileName, `${field}.width`),
        height:
          block.height === undefined ? undefined : requirePositiveInteger(block.height, fileName, `${field}.height`),
      };
    case "keyValue":
      requireExactKeys(block, ["type", "items"], fileName, field);
      return {
        type,
        items: requireArray(block.items, fileName, `${field}.items`).map((item, index) => {
          const itemField = `${field}.items[${index}]`;
          const record = requireRecord(item, fileName, itemField);
          requireExactKeys(record, ["label", "value"], fileName, itemField);
          return {
            label: requireString(record.label, fileName, `${itemField}.label`),
            value: requireString(record.value, fileName, `${itemField}.value`),
          };
        }),
      };
    case "numbered":
      requireExactKeys(block, ["type", "items"], fileName, field);
      return {
        type,
        items: requireArray(block.items, fileName, `${field}.items`).map((item, index) => {
          const itemField = `${field}.items[${index}]`;
          const record = requireRecord(item, fileName, itemField);
          requireExactKeys(record, ["title", "body"], fileName, itemField);
          return {
            title: requireString(record.title, fileName, `${itemField}.title`),
            body: requireStringArray(record.body, fileName, `${itemField}.body`),
          };
        }),
      };
    case "callout":
      requireExactKeys(block, ["type", "text", "label"], fileName, field);
      return {
        type,
        text: requireString(block.text, fileName, `${field}.text`),
        label: optionalString(block.label, fileName, `${field}.label`),
      };
    case "links":
      requireExactKeys(block, ["type", "items"], fileName, field);
      return {
        type,
        items: requireArray(block.items, fileName, `${field}.items`).map((item, index) => {
          const itemField = `${field}.items[${index}]`;
          const record = requireRecord(item, fileName, itemField);
          requireExactKeys(record, ["label", "href", "note"], fileName, itemField);
          return {
            label: requireString(record.label, fileName, `${itemField}.label`),
            href: requireSafePublicReference(record.href, fileName, `${itemField}.href`),
            note: optionalString(record.note, fileName, `${itemField}.note`),
          };
        }),
      };
    default:
      fail(fileName, `Unsupported block type "${type}" in "${field}".`);
  }
}

export function parsePublication(raw, fileName, { publicDirectory = path.join(process.cwd(), "public") } = {}) {
  const publication = requireRecord(raw, fileName, "publication");
  requireExactKeys(publication, ["schemaVersion", "metadata", "provenance", "quote", "sections"], fileName, "publication");

  if (publication.schemaVersion !== LAB_SCHEMA_VERSION) {
    fail(fileName, `"schemaVersion" must be ${LAB_SCHEMA_VERSION}; received ${JSON.stringify(publication.schemaVersion)}.`);
  }

  const metadata = parseMetadata(publication.metadata, fileName);

  if (`${metadata.slug}.json` !== fileName) {
    fail(fileName, `The file name must match metadata.slug (expected "${metadata.slug}.json").`);
  }

  const sections = requireArray(publication.sections, fileName, "sections").map((item, sectionIndex) => {
    const field = `sections[${sectionIndex}]`;
    const section = requireRecord(item, fileName, field);
    requireExactKeys(section, ["title", "blocks"], fileName, field);

    return {
      title: requireString(section.title, fileName, `${field}.title`),
      blocks: requireArray(section.blocks, fileName, `${field}.blocks`).map((block, blockIndex) =>
        parseBlock(block, fileName, `${field}.blocks[${blockIndex}]`, publicDirectory),
      ),
    };
  });

  const provenance = parseProvenance(publication.provenance, fileName);
  const referenceIds = [
    ...(metadata.evidence ?? []).map((reference) => reference.id),
    ...(provenance.publicReferences ?? []).map((reference) => reference.id),
  ];
  assertUniqueValues(referenceIds, fileName, "evidence and provenance reference IDs");

  return {
    schemaVersion: LAB_SCHEMA_VERSION,
    metadata,
    provenance,
    quote: optionalString(publication.quote, fileName, "quote"),
    sections,
  };
}

export function parseLabConfig(raw, fileName = LAB_CONFIG_FILE) {
  const config = requireRecord(raw, fileName, "config");
  requireExactKeys(
    config,
    ["identifier", "name", "description", "operatingPrinciple", "status", "governance", "activeProjects", "lastUpdated"],
    fileName,
    "config",
  );
  const status = requireRecord(config.status, fileName, "status");
  const governance = requireRecord(config.governance, fileName, "governance");
  requireExactKeys(status, ["label", "detail"], fileName, "status");
  requireExactKeys(governance, ["label", "detail"], fileName, "governance");
  const activeProjects = requireArray(config.activeProjects, fileName, "activeProjects", { allowEmpty: true }).map(
    (item, index) => {
      const field = `activeProjects[${index}]`;
      const project = requireRecord(item, fileName, field);
      requireExactKeys(project, ["id", "name", "status"], fileName, field);
      return {
        id: requireStableId(project.id, fileName, `${field}.id`),
        name: requireString(project.name, fileName, `${field}.name`),
        status: requireString(project.status, fileName, `${field}.status`),
      };
    },
  );
  assertUniqueValues(
    activeProjects.map((project) => project.id),
    fileName,
    "activeProjects IDs",
  );

  return {
    identifier: requireStableId(config.identifier, fileName, "identifier"),
    name: requireString(config.name, fileName, "name"),
    description: requireString(config.description, fileName, "description"),
    operatingPrinciple: requireString(config.operatingPrinciple, fileName, "operatingPrinciple"),
    status: {
      label: requireString(status.label, fileName, "status.label"),
      detail: requireString(status.detail, fileName, "status.detail"),
    },
    governance: {
      label: requireString(governance.label, fileName, "governance.label"),
      detail: requireString(governance.detail, fileName, "governance.detail"),
    },
    activeProjects,
    lastUpdated: requireDate(config.lastUpdated, fileName, "lastUpdated"),
  };
}

export function assertUniquePublicationKeys(entries) {
  const ids = new Map();
  const slugs = new Map();

  for (const entry of entries) {
    const previousIdFile = ids.get(entry.id);
    const previousSlugFile = slugs.get(entry.slug);

    if (previousIdFile) {
      fail(entry.fileName, `Duplicate publication id "${entry.id}"; first declared in "${previousIdFile}".`);
    }

    if (previousSlugFile) {
      fail(entry.fileName, `Duplicate publication slug "${entry.slug}"; first declared in "${previousSlugFile}".`);
    }

    ids.set(entry.id, entry.fileName);
    slugs.set(entry.slug, entry.fileName);
  }
}

export function collectPublicationReferences(publication) {
  const references = [];

  if (publication.metadata.project?.href) {
    references.push({ field: "metadata.project.href", href: publication.metadata.project.href, kind: "link" });
  }

  for (const [index, reference] of (publication.metadata.evidence ?? []).entries()) {
    references.push({ field: `metadata.evidence[${index}].href`, href: reference.href, kind: "link" });
  }

  for (const [index, reference] of (publication.provenance.publicReferences ?? []).entries()) {
    references.push({ field: `provenance.publicReferences[${index}].href`, href: reference.href, kind: "link" });
  }

  for (const [sectionIndex, section] of publication.sections.entries()) {
    for (const [blockIndex, block] of section.blocks.entries()) {
      if (block.type === "image") {
        references.push({
          field: `sections[${sectionIndex}].blocks[${blockIndex}].src`,
          href: block.src,
          kind: "image",
        });
      }

      if (block.type === "links") {
        for (const [linkIndex, link] of block.items.entries()) {
          references.push({
            field: `sections[${sectionIndex}].blocks[${blockIndex}].items[${linkIndex}].href`,
            href: link.href,
            kind: "link",
          });
        }
      }
    }
  }

  return references;
}
