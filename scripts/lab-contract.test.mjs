import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  assertUniquePublicationKeys,
  isPublicationArtifactFile,
  isPublicPublication,
  LAB_CONFIG_FILE,
  parseJsonSource,
  parseLabConfig,
  parsePublication,
} from "../lib/lab/contract.mjs";

const publicDirectory = path.join(process.cwd(), "public");
const contentDirectory = path.join(process.cwd(), "content", "lab");

function publicationFixture({
  id = "LAB-TEST-001",
  slug = "valid-publication",
  status = "published",
  reviewStatus = "approved",
} = {}) {
  return {
    schemaVersion: 1,
    metadata: {
      id,
      slug,
      title: "Valid publication",
      description: "A minimal fixture for the versioned Lab publication contract.",
      date: "2026-08-15",
      type: "Lab Report",
      project: {
        name: "Public project",
        href: "https://example.com/project",
      },
      tags: ["Validation"],
      outcome: {
        classification: "supported",
        summary: "The fixture satisfies the publication contract.",
      },
      status,
      reviewStatus,
      evidence: [
        {
          id: "public-evidence",
          label: "Public evidence",
          href: "/images/lab/autocritic/single-file-review.png",
        },
      ],
    },
    provenance: {
      origin: "human-authored",
      summary: "Human-authored public validation fixture.",
      publicReferences: [
        {
          id: "public-source",
          label: "Public source",
          href: "https://example.com/source",
        },
      ],
    },
    sections: [
      {
        title: "Finding",
        blocks: [
          {
            type: "paragraph",
            text: "The publication contract is intentionally small and deterministic.",
          },
          {
            type: "image",
            src: "/images/lab/autocritic/single-file-review.png",
            alt: "Public Lab fixture image",
            width: 900,
            height: 506,
          },
        ],
      },
    ],
  };
}

function parse(fixture, fileName = `${fixture.metadata.slug}.json`) {
  return parsePublication(fixture, fileName, { publicDirectory });
}

test("validates every repository Lab JSON file except the explicit config as a publication", () => {
  const entries = [];

  for (const fileName of fs.readdirSync(contentDirectory).filter((name) => name.endsWith(".json")).sort()) {
    const raw = parseJsonSource(fs.readFileSync(path.join(contentDirectory, fileName), "utf8"), fileName);

    if (fileName === LAB_CONFIG_FILE) {
      parseLabConfig(raw, fileName);
      continue;
    }

    const publication = parsePublication(raw, fileName, { publicDirectory });
    entries.push({ fileName, id: publication.metadata.id, slug: publication.metadata.slug });
  }

  assertUniquePublicationKeys(entries);
  assert.ok(entries.length > 0);
});

test("prefixes JSON parsing failures with the source filename", () => {
  assert.throws(() => parseJsonSource("{ invalid", "broken.json"), /\[Lab content: broken\.json\] Invalid JSON:/);
});

test("treats underscore-prefixed JSON files as publication artifacts", () => {
  assert.equal(isPublicationArtifactFile("_candidate.json"), true);
  assert.equal(isPublicationArtifactFile(LAB_CONFIG_FILE), false);
});

test("accepts a reviewed published publication", () => {
  const publication = parse(publicationFixture());
  assert.equal(publication.metadata.status, "published");
  assert.equal(publication.metadata.reviewStatus, "approved");
  assert.equal(isPublicPublication(publication), true);
});

test("accepts a pending draft", () => {
  const publication = parse(publicationFixture({ status: "draft", reviewStatus: "pending" }));
  assert.equal(publication.metadata.status, "draft");
  assert.equal(publication.metadata.reviewStatus, "pending");
  assert.equal(isPublicPublication(publication), false);
});

test("does not expose an approved draft", () => {
  const publication = parse(publicationFixture({ status: "draft", reviewStatus: "approved" }));
  assert.equal(isPublicPublication(publication), false);
});

test("requires an explicit review state on every publication", () => {
  const fixture = publicationFixture({ status: "draft", reviewStatus: "pending" });
  delete fixture.metadata.reviewStatus;
  assert.throws(() => parse(fixture), /"metadata\.reviewStatus" must be a non-empty string/);
});

test("rejects a published but unapproved publication", () => {
  assert.throws(
    () => parse(publicationFixture({ reviewStatus: "pending" })),
    /\[Lab content: valid-publication\.json\].*published.*approved/,
  );
});

test("rejects unknown properties", () => {
  const fixture = publicationFixture();
  fixture.metadata.readTime = "2 min";
  assert.throws(() => parse(fixture), /unknown property.*"readTime"/);
});

test("rejects unsupported schema versions", () => {
  const fixture = publicationFixture();
  fixture.schemaVersion = 2;
  assert.throws(() => parse(fixture), /"schemaVersion" must be 1/);
});

test("rejects duplicate publication IDs and slugs", () => {
  assert.throws(
    () =>
      assertUniquePublicationKeys([
        { fileName: "first.json", id: "LAB-001", slug: "first" },
        { fileName: "second.json", id: "LAB-001", slug: "second" },
      ]),
    /\[Lab content: second\.json\].*Duplicate publication id/,
  );
  assert.throws(
    () =>
      assertUniquePublicationKeys([
        { fileName: "first.json", id: "LAB-001", slug: "same" },
        { fileName: "second.json", id: "LAB-002", slug: "same" },
      ]),
    /\[Lab content: second\.json\].*Duplicate publication slug/,
  );
});

for (const unsafeUrl of [
  "javascript:alert(1)",
  "data:text/html,unsafe",
  "file:///tmp/private.txt",
  "http://example.com",
  "https:example.com",
  "//example.com/path",
  "\\\\server\\share",
  "C:\\private\\evidence.txt",
  "/public/../private",
  "https://localhost/evidence",
  "https://127.0.0.1/evidence",
  "https://10.0.0.8/evidence",
  "https://[::1]/evidence",
  "https://user:password@example.com/evidence",
]) {
  test(`rejects unsafe URL: ${unsafeUrl}`, () => {
    const fixture = publicationFixture();
    fixture.metadata.project.href = unsafeUrl;
    assert.throws(() => parse(fixture), /\[Lab content: valid-publication\.json\]/);
  });
}

test("rejects an image outside the public Lab media directory", () => {
  const fixture = publicationFixture();
  fixture.sections[0].blocks[1].src = "/images/blog/legacy.png";
  assert.throws(() => parse(fixture), /must be a site-local path beneath.*\/images\/lab\//);
});

test("rejects missing local Lab media", () => {
  const fixture = publicationFixture();
  fixture.sections[0].blocks[1].src = "/images/lab/missing-image.png";
  assert.throws(() => parse(fixture), /references missing public media/);
});

test("rejects an unsupported block type", () => {
  const fixture = publicationFixture();
  fixture.sections[0].blocks[0] = { type: "rawHtml", html: "<p>unsafe</p>" };
  assert.throws(() => parse(fixture), /Unsupported block type "rawHtml"/);
});

test("rejects semantically empty block collections", () => {
  const fixture = publicationFixture();
  fixture.sections[0].blocks = [];
  assert.throws(() => parse(fixture), /"sections\[0\]\.blocks" must contain at least one item/);
});
