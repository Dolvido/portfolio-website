# Lab publication authoring

Lab publications are dependency-free JSON artifacts in this directory. The file name must match `metadata.slug`
(for example, `evaluation-run-01.json`). `lab.config.json` is the only config file and the only JSON file excluded from
publication validation. Every other `*.json` file, including names beginning with `_`, is treated as a publication and
must pass the contract.

The build-time loader validates every artifact and `app/lab/[slug]/page.tsx` generates a static route for each approved,
published artifact. Adding a publication never requires editing React source.

> **EVERY VALUE IN A PROMOTED LAB PUBLICATION ARTIFACT MUST BE SAFE FOR PUBLIC DISCLOSURE.**

Do not include local filesystem paths, private evidence bundles, agent or tool traces, credentials, internal OpenClaw
provenance, raw run manifests, or private logs. Validation rejects unsafe reference forms, but human approval remains
the final disclosure gate for prose, code samples, captions, and all other content.

## Public information architecture

The Lab index treats publication taxonomy and archive placement as separate concerns:

- Approved, published Lab artifacts whose provenance origin is `human-authored` or `reviewed-candidate` appear in
  **Current Publications**.
- Approved, published artifacts whose provenance origin is `historical-migration` remain routable Lab-compatible
  records but appear under **Pre-Lab Engineering**.
- Retained Ideas are adapted from `app/data/portfolio.ts` for namespace compatibility and remain at `/ideas`; they do
  not enter the Current Publications register.

This is a presentation rule, not a schema addition. A historical artifact keeps its real publication type. Adding a
normal approved Lab artifact automatically places it in Current Publications and makes it eligible for the homepage.

## Publication contract (schema version 1)

Top-level fields are `schemaVersion`, `metadata`, `provenance`, optional `quote`, and `sections`. Unknown properties are
rejected at every object level rather than discarded.

Required metadata:

- `id`: stable publication identifier.
- `slug`: unique lowercase kebab-case URL segment and JSON file name.
- `title`: publication title.
- `description`: concise index and social metadata summary.
- `date`: `YYYY-MM` or `YYYY-MM-DD`.
- `type`: `Lab Report`, `Experiment`, `Project Log`, `Engineering Note`, `Field Note`, or `Idea`.
- `outcome`: `{ "classification", "summary" }`, where classification is `supported`, `not-supported`,
  `inconclusive`, `ongoing`, or `not-applicable`.
- `status`: `draft` or `published`.
- `reviewStatus`: `pending` or `approved`.

Optional metadata:

- `project`: `{ "id"?, "name", "href"? }` affiliation.
- `tags`: non-empty discovery labels.
- `evidence`: public references with required stable `id`, `label`, and `href`, plus optional `kind` and `note`.

`provenance` is required and intentionally narrow. It contains:

- `origin`: `human-authored`, `historical-migration`, or `reviewed-candidate`.
- `summary`: a public-safe explanation of the publication's origin.
- optional `generatedAt`: a timezone-qualified RFC 3339 timestamp.
- optional `sourceRevision`: a public revision token, never a path or URL.
- optional `publicReferences`: public references using the same stable-ID and safe-link rules as evidence.

Evidence IDs and provenance-reference IDs must be unique within an artifact. Publication IDs and slugs are globally
unique across structured Lab artifacts and retained Idea adapters. Artifacts are ordered by date descending, then by
stable ID and slug.

## Approval invariant

Every artifact requires an explicit review state. Drafts may be `pending` or `approved`. A publication with
`status: "published"` must also have `reviewStatus: "approved"`; any published-but-unapproved artifact fails validation
and the build. Drafts are validated but receive no static route and never appear in the public register.

Negative, rejected, and uncertain results are first-class outcomes. Use `not-supported` or `inconclusive` rather than
omitting them. Use `not-applicable` for publications, such as design notes, that do not claim an experimental result.

## Public references and media

Publication-controlled links may only be:

- an `https://` URL to a public host, without credentials; or
- a site-root-relative path beginning with exactly one `/`.

Validation rejects other schemes, HTTP, protocol-relative URLs, backslashes, Windows/UNC paths, traversal, localhost,
obvious private or non-public network addresses, URL credentials, control characters, and malformed encoding.

Image blocks are stricter: `src` must be a site-local raster image below `/images/lab/`, must remain inside that
directory after decoding and real-path resolution, and must name a file that already exists under `public/images/lab/`.
Evidence, project, provenance, and article links use the same public-safe URL validation. Post-build validation also
checks that every site-local reference in each published artifact resolves in `out/`.

## Body structure

`sections` is a non-empty ordered array of `{ "title", "blocks" }`. Section numbers are calculated during rendering;
authors do not store labels such as `00 / Problem`. Empty sections, empty block collections, and empty item collections
are rejected. Supported block types are intentionally limited to:

- `paragraph`: `{ "type": "paragraph", "text": "..." }`
- `list`: `{ "type": "list", "items": ["..."], "ordered": false }`
- `code`: `{ "type": "code", "language": "python", "caption": "...", "code": "..." }`
- `image`: `{ "type": "image", "src": "/images/lab/...png", "alt": "...", "caption": "...", "width": 900, "height": 506 }`
- `keyValue`: an `items` array of `{ "label", "value" }`
- `numbered`: an `items` array of `{ "title", "body": ["paragraph..."] }`
- `callout`: `{ "type": "callout", "label": "...", "text": "..." }`
- `links`: an `items` array of `{ "label", "href", "note"? }`

Read time is calculated from the artifact at build time. Homepage selection and archive placement are view concerns,
not publication semantics, so neither `readTime`, `featured`, nor an archive category belongs in the JSON contract.

## Validate and publish manually

Run:

```text
npm run validate:lab
npm run lint
npm run build
npm run validate:lab:build
```

The intended future boundary remains:

```text
OpenClaw candidate bundle
        -> human review / promotion
        -> sanitized, versioned public Lab JSON + public figures
        -> portfolio build
```

This repository does not implement candidate promotion, OpenClaw runtime integration, content writing, review,
commits, deployment, or scheduling.
