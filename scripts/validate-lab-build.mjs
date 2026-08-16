import fs from "node:fs";
import path from "node:path";
import {
  assertUniquePublicationKeys,
  collectPublicationReferences,
  isPublicationArtifactFile,
  isPublicPublication,
  LAB_CONFIG_FILE,
  labContentError,
  parseJsonSource,
  parseLabConfig,
  parsePublication,
} from "../lib/lab/contract.mjs";

const repositoryRoot = process.cwd();
const contentDirectory = path.join(repositoryRoot, "content", "lab");
const publicDirectory = path.join(repositoryRoot, "public");
const outputDirectory = path.join(repositoryRoot, "out");
const siteOrigin = "https://lukepayne.web.app";
const portfolioSocialImage = `${siteOrigin}/images/headshot2026.webp`;
const labSocialImage = `${siteOrigin}/images/lab/openclaw-lab-og.png`;

function fail(message) {
  throw new Error(`[Lab post-build] ${message}`);
}

function requireFile(filePath, description) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    fail(`Missing ${description}: ${path.relative(repositoryRoot, filePath)}`);
  }
}

function readJson(filePath, fileName) {
  let source;

  try {
    source = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw labContentError(fileName, `Unable to read file: ${detail}`);
  }

  return parseJsonSource(source, fileName);
}

function readHtml(filePath, description) {
  requireFile(filePath, description);
  return fs.readFileSync(filePath, "utf8");
}

function requireHtmlValue(html, value, description) {
  if (!html.includes(value)) {
    fail(`${description} is missing ${JSON.stringify(value)}.`);
  }
}

function rejectHtmlValue(html, value, description) {
  if (html.includes(value)) {
    fail(`${description} must not contain ${JSON.stringify(value)}.`);
  }
}

function routeFile(slug) {
  return path.join(outputDirectory, "lab", slug, "index.html");
}

function localOutputCandidates(href) {
  const url = new URL(href, siteOrigin);
  const decodedPath = decodeURIComponent(url.pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const directPath = path.join(outputDirectory, ...relativePath.split("/").filter(Boolean));

  if (decodedPath === "/") {
    return [path.join(outputDirectory, "index.html")];
  }

  if (decodedPath.endsWith("/")) {
    return [path.join(directPath, "index.html")];
  }

  if (path.posix.extname(decodedPath) !== "") {
    return [directPath];
  }

  return [path.join(directPath, "index.html"), `${directPath}.html`, directPath];
}

function requireLocalReference(href, sourceDescription) {
  if (!href.startsWith("/")) {
    return;
  }

  const candidates = localOutputCandidates(href);

  if (!candidates.some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())) {
    fail(
      `${sourceDescription} does not resolve in the static export: ${href} (checked ${candidates
        .map((candidate) => path.relative(repositoryRoot, candidate))
        .join(", ")}).`,
    );
  }
}

function walkHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return walkHtmlFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
  });
}

const notFoundHtml = readHtml(path.join(outputDirectory, "404.html"), "exported custom 404 page");
const homepageHtml = readHtml(path.join(outputDirectory, "index.html"), "homepage");

if (notFoundHtml === homepageHtml || !/(?:404|not found)/i.test(notFoundHtml)) {
  fail("The exported 404 page must be distinct from the homepage and identify the not-found response.");
}

const firebaseConfig = readJson(path.join(repositoryRoot, "firebase.json"), "firebase.json");
const hosting = firebaseConfig.hosting;

if (!hosting || typeof hosting !== "object" || Array.isArray(hosting)) {
  fail("firebase.json must define a Hosting configuration.");
}

if (Array.isArray(hosting.rewrites) && hosting.rewrites.length > 0) {
  fail("firebase.json must not contain a catch-all SPA rewrite for this static export.");
}

const requiredRedirects = [
  { source: "/blog/autocritic", destination: "/lab/autocritic/", type: 301 },
  { source: "/blog/autocritic/", destination: "/lab/autocritic/", type: 301 },
  { source: "/blog", destination: "/lab/", type: 301 },
  { source: "/blog/", destination: "/lab/", type: 301 },
];

for (const requiredRedirect of requiredRedirects) {
  const matchingRedirect = hosting.redirects?.find(
    (redirect) =>
      redirect.source === requiredRedirect.source &&
      redirect.destination === requiredRedirect.destination &&
      redirect.type === requiredRedirect.type,
  );

  if (!matchingRedirect) {
    fail(`firebase.json is missing permanent redirect ${requiredRedirect.source} -> ${requiredRedirect.destination}.`);
  }
}

parseLabConfig(
  readJson(path.join(contentDirectory, LAB_CONFIG_FILE), LAB_CONFIG_FILE),
  LAB_CONFIG_FILE,
);

const publicationEntries = fs
  .readdirSync(contentDirectory)
  .filter(isPublicationArtifactFile)
  .sort()
  .map((fileName) => ({
    fileName,
    publication: parsePublication(readJson(path.join(contentDirectory, fileName), fileName), fileName, {
      publicDirectory,
    }),
  }));

assertUniquePublicationKeys(
  publicationEntries.map(({ fileName, publication }) => ({
    fileName,
    id: publication.metadata.id,
    slug: publication.metadata.slug,
  })),
);

const publishedEntries = publicationEntries.filter(({ publication }) => isPublicPublication(publication));
const draftEntries = publicationEntries.filter(({ publication }) => publication.metadata.status === "draft");
const currentEntries = publishedEntries.filter(
  ({ publication }) => publication.provenance.origin !== "historical-migration",
);
const preLabEntries = publishedEntries.filter(
  ({ publication }) => publication.provenance.origin === "historical-migration",
);

const labIndexHtml = readHtml(path.join(outputDirectory, "lab", "index.html"), "Lab index route");
requireHtmlValue(labIndexHtml, `<link rel="canonical" href="${siteOrigin}/lab/"/>`, "Lab index canonical metadata");
requireHtmlValue(labIndexHtml, `<meta property="og:image" content="${labSocialImage}"/>`, "Lab index social metadata");

const currentSectionStart = labIndexHtml.indexOf('id="current-publications"');
const archiveSectionStart = labIndexHtml.indexOf('id="archive"');

if (currentSectionStart < 0 || archiveSectionStart <= currentSectionStart) {
  fail("The Lab index must render Current Publications before the Archive.");
}

const currentSectionHtml = labIndexHtml.slice(currentSectionStart, archiveSectionStart);
const archiveSectionHtml = labIndexHtml.slice(archiveSectionStart);

for (const { fileName, publication } of currentEntries) {
  requireHtmlValue(
    currentSectionHtml,
    `href="/lab/${publication.metadata.slug}/"`,
    `Current Publications register entry for ${fileName}`,
  );
}

for (const { fileName, publication } of preLabEntries) {
  rejectHtmlValue(
    currentSectionHtml,
    `href="/lab/${publication.metadata.slug}/"`,
    `Current Publications register for historical artifact ${fileName}`,
  );
  requireHtmlValue(
    archiveSectionHtml,
    `href="/lab/${publication.metadata.slug}/"`,
    `Pre-Lab Engineering archive entry for ${fileName}`,
  );
}

rejectHtmlValue(currentSectionHtml, 'href="/ideas', "Current Publications register");
requireHtmlValue(archiveSectionHtml, 'href="/ideas/"', "Research & Ideas archive link");

if (currentEntries.length === 0) {
  requireHtmlValue(
    currentSectionHtml,
    "No current Lab reports have been published yet.",
    "Current Publications empty state",
  );
}

for (const { fileName, publication } of publishedEntries) {
  const html = readHtml(routeFile(publication.metadata.slug), `published Lab route for ${fileName}`);
  requireHtmlValue(
    html,
    `<link rel="canonical" href="${siteOrigin}/lab/${publication.metadata.slug}/"/>`,
    `canonical metadata for ${fileName}`,
  );
  requireHtmlValue(
    html,
    `<meta property="og:image" content="${labSocialImage}"/>`,
    `Lab social metadata for ${fileName}`,
  );

  for (const reference of collectPublicationReferences(publication)) {
    requireLocalReference(reference.href, `${fileName} ${reference.field}`);
  }
}

for (const { fileName, publication } of draftEntries) {
  const candidates = [routeFile(publication.metadata.slug), path.join(outputDirectory, "lab", `${publication.metadata.slug}.html`)];

  if (candidates.some((candidate) => fs.existsSync(candidate))) {
    fail(`Draft publication ${fileName} was emitted as a public route.`);
  }
}

if (!publishedEntries.some(({ publication }) => publication.metadata.slug === "autocritic")) {
  fail("AutoCritic is not present as an approved published artifact.");
}

const autoCriticHtml = readHtml(routeFile("autocritic"), "AutoCritic Lab route");
requireHtmlValue(autoCriticHtml, "Pre-Lab Engineering", "AutoCritic archive placement");
requireHtmlValue(autoCriticHtml, "Human approved", "AutoCritic human review state");
requireHtmlValue(autoCriticHtml, "predates OpenClaw Lab", "AutoCritic historical provenance");

for (const { fileName, publication } of preLabEntries) {
  rejectHtmlValue(
    homepageHtml,
    `href="/lab/${publication.metadata.slug}/"`,
    `homepage current Lab highlights for historical artifact ${fileName}`,
  );
}

if (currentEntries.length === 0) {
  requireHtmlValue(homepageHtml, "Explore OpenClaw Lab", "homepage Lab overview CTA");
} else {
  const [latestCurrentEntry] = [...currentEntries].sort((left, right) => {
    const dateOrder = right.publication.metadata.date.localeCompare(left.publication.metadata.date);

    if (dateOrder !== 0) {
      return dateOrder;
    }

    const idOrder = left.publication.metadata.id.localeCompare(right.publication.metadata.id);
    return idOrder !== 0
      ? idOrder
      : left.publication.metadata.slug.localeCompare(right.publication.metadata.slug);
  });
  requireHtmlValue(
    homepageHtml,
    `href="/lab/${latestCurrentEntry.publication.metadata.slug}/"`,
    "homepage latest current Lab publication",
  );
}

const ideasIndexHtml = readHtml(path.join(outputDirectory, "ideas", "index.html"), "Ideas archive route");
requireHtmlValue(
  ideasIndexHtml,
  `<link rel="canonical" href="${siteOrigin}/ideas/"/>`,
  "Ideas archive canonical metadata",
);

for (const ideaSlug of [
  "agents-need-flight-recorders",
  "rubrics-beat-vibes",
  "poisoned-context-supply-chain-risk",
  "nanotech-safety",
  "unconscious-nanodrone-swarm",
]) {
  requireFile(path.join(outputDirectory, "ideas", ideaSlug, "index.html"), `retained Idea route ${ideaSlug}`);
}

const globalSocialPages = [
  [path.join(outputDirectory, "index.html"), "homepage"],
  [path.join(outputDirectory, "projects", "index.html"), "projects index"],
  [path.join(outputDirectory, "resume", "index.html"), "resume"],
];

const projectRouteDirectory = path.join(outputDirectory, "projects");
for (const entry of fs.readdirSync(projectRouteDirectory, { withFileTypes: true })) {
  if (entry.isDirectory()) {
    globalSocialPages.push([path.join(projectRouteDirectory, entry.name, "index.html"), `project ${entry.name}`]);
  }
}

for (const [filePath, description] of globalSocialPages) {
  const html = readHtml(filePath, description);
  requireHtmlValue(
    html,
    `<meta property="og:image" content="${portfolioSocialImage}"/>`,
    `${description} portfolio social metadata`,
  );

  if (html.includes(labSocialImage)) {
    fail(`${description} incorrectly inherits the Lab-specific social image.`);
  }
}

for (const [relativePath, canonicalPath] of [
  [path.join("blog", "index.html"), "/lab/"],
  [path.join("blog", "autocritic", "index.html"), "/lab/autocritic/"],
]) {
  const html = readHtml(path.join(outputDirectory, relativePath), `compatibility route ${relativePath}`);
  requireHtmlValue(html, `<link rel="canonical" href="${siteOrigin}${canonicalPath}"/>`, `${relativePath} canonical metadata`);

  if (!/<meta name="robots" content="[^"]*noindex[^"]*follow[^"]*"\/>/.test(html)) {
    fail(`${relativePath} must render noindex,follow metadata as a fallback to the Hosting redirect.`);
  }
}

for (const htmlFile of walkHtmlFiles(outputDirectory)) {
  const relativePath = path.relative(outputDirectory, htmlFile).replaceAll("\\", "/");

  if (!relativePath.startsWith("blog/") && fs.readFileSync(htmlFile, "utf8").includes('href="/blog')) {
    fail(`${relativePath} contains an internal link to a legacy /blog alias.`);
  }
}

if (fs.existsSync(path.join(outputDirectory, "__lab-validation-missing__"))) {
  fail("The reserved unknown-path probe unexpectedly exists in the export.");
}

console.log(
  `Lab post-build validation passed: ${currentEntries.length} current publication(s), ${preLabEntries.length} pre-Lab artifact(s), ${draftEntries.length} draft route exclusion(s), archive separation, homepage selection, Ideas routes, canonical/social metadata, local references, redirects, and static 404 behavior verified.`,
);
