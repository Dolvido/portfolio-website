# OpenClaw series editorial map

This reorganization uses [the published snapshot](https://github.com/Dolvido/portfolio-website/blob/aac361bb540d581a523f06d48e5ffa0c1a11008d/content/lab/openclaw-engine-progress.json), not the newer unpublished handoff notes. It changes presentation and scope, not engineering status.

The existing /lab/openclaw-engine-progress/ URL becomes the overview. Eight numbered posts carry the technical stories, with summaries, limitations, historical-source references and previous/next navigation. The existing Lab loader discovers them automatically.

September 29, 2026 is the editorial reorganization date. Provenance identifies the unchanged engineering snapshot. Results are condensed, not claimed as new experiments or a newly qualified release.

## Source coverage

| Original sections / material | Destination |
| --- | --- |
| Where the Lab stands; What still needs to connect; The next demonstration; How progress will be reported | Overview |
| Verified source and package; later 1,692-test checkout; repeatable native builds | 1. Reproducible releases |
| Stopping work; requester loss; dispatch/completion recovery; startup journal history | 2. Cancellation and recovery |
| Worker safeguards; V2 delivery; setup evidence; final-result replies and journal handshake | 3. Worker communication |
| Runtime pieces; build contracts and policy; evaluator configuration gap; successor validation; native platform checks; revised bindings | 4. Runtime validation |
| One-use permission; evaluator packaging; runtime files and parent journal; privileged supervisor; parent guard; native handoff; wrapper architecture decision; real entry; syscall filter | 5. Evaluator startup |
| Startup probes; protected startup composition; launcher preflights; witness loading and socket retention; broker activation; connection quarantine | 6. Measured service startup |
| Circular binary/acceptance dependency | 7. Build approval cycle |
| Data size failure; shared-byte format; retained-reader migration and refreshed diagnostics | 8. Startup-data capacity |

The oversized “Connecting saved tasks to the worker” section supplied material for posts 1, 3, 6, 7 and 8. Repeated next-step lists, transitional totals and superseded inventories are condensed. The pinned original preserves the complete chronology. The older source-v9 status graphic is omitted from the overview; a responsive diagram replaces the intended-workflow image.

## Visual coverage

Every series document has a figure tailored to its question: an intended-workflow diagram in the overview, a release-evidence comparison, stopping/recovery flow, worker request/reply flow, runtime-validation flow, evaluator/parent verification flow, measured-service startup flow, before/after build-dependency comparison, and a startup-capacity bar chart.

These are server-rendered HTML figures with selectable text, captions and readable list structure. Mobile layouts stack the steps; wider layouts show the flow horizontally. Pending work is labeled explicitly, with dashed borders in addition to color. The capacity chart uses a shared zero baseline, exact byte values and the old limit as a reference; it labels the old payload as a lower bound and distinguishes inventory snapshots.

The existing version-1 publication contract gains two validated block types, `diagram` and `barChart`. Unknown nested fields, unsupported layouts, invalid scales and out-of-range values are rejected. No raw markup, executable diagram options or client-side chart library is introduced.

## Future updates

- Keep the overview short; update the reading guide and high-level status.
- Give each follow-up one question, a concrete result and explicit evidence limits.
- Create a new post for a new milestone rather than extending a completed topic.
- Distinguish synthetic records, diagnostics, accepted deployments and complete coding tasks.
- Review unpublished handoff notes separately before creating a new public claim.
- Preserve the source-snapshot link in these retrospective posts.

## Review and release

Review content, evidence labels, desktop/mobile layouts and the hosted preview before merging into the production publication flow. The user authorized production deployment after review. The existing main-branch workflow publishes the merged site.
