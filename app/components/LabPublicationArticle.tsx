import SiteLink from "./SiteLink";
import Image from "next/image";
import { calculatePublicationReadTime, formatPublicationDate } from "../../lib/lab/publications";
import {
  LabPublication,
  outcomeClassificationLabels,
  provenanceOriginLabels,
  PublicationBlock,
} from "../../lib/lab/types";
import ArticleChrome, { ArticleSection, NumberedPanel } from "./ArticleChrome";
import PublicationVisual from "./PublicationVisual";

function PublicationLink({href,children}:{href:string;children:React.ReactNode}){return <SiteLink href={href} className="accent-link">{children}</SiteLink>;}

function PublicationContentBlock({ block }: { block: PublicationBlock }) {
  switch (block.type) {
    case "diagram":
    case "barChart":
      return <PublicationVisual block={block} />;
    case "paragraph":
      return <p>{block.text}</p>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    case "code":
      return (
        <figure>
          {block.caption ? (
            <figcaption className="mb-3 flex items-center justify-between gap-4 text-xs font-semibold uppercase text-[var(--muted)]">
              <span>{block.caption}</span>
              {block.language ? <span className="text-[var(--accent)]">{block.language}</span> : null}
            </figcaption>
          ) : null}
          <pre
            data-language={block.language}
            className="overflow-x-auto border border-[var(--ink)] bg-[var(--ink)] p-4 text-xs leading-6 text-[var(--paper)]"
          >
            <code className={block.language ? `language-${block.language}` : undefined}>{block.code}</code>
          </pre>
        </figure>
      );
    case "image":
      return (
        <figure>
          {block.caption ? (
            <figcaption className="mb-3 text-xs font-semibold uppercase text-[var(--muted)]">{block.caption}</figcaption>
          ) : null}
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width ?? 1200}
            height={block.height ?? 675}
            className="h-auto w-full border border-[var(--ink)]"
          />
        </figure>
      );
    case "keyValue":
      return (
        <dl className="grid border-l border-t border-[var(--ink)] md:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.label} className="border-b border-r border-[var(--ink)] p-4">
              <dt className="text-xs font-semibold uppercase text-[var(--accent)]">{item.label}</dt>
              <dd className="mt-2 text-sm text-[var(--muted)]">{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "numbered":
      return (
        <div className="border-b-2 border-[var(--ink)]">
          {block.items.map((item, index) => (
            <NumberedPanel key={item.title} number={String(index + 1).padStart(2, "0")} title={item.title}>
              {item.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </NumberedPanel>
          ))}
        </div>
      );
    case "callout":
      return (
        <aside className="border-l-2 border-[var(--accent)] bg-[var(--panel)] p-5">
          {block.label ? (
            <div className="mb-2 text-xs font-semibold uppercase text-[var(--accent)]">{block.label}</div>
          ) : null}
          <p className="text-sm leading-7 text-[var(--ink)]">{block.text}</p>
        </aside>
      );
    case "links":
      return (
        <div className="border-b border-[var(--ink)]">
          {block.items.map((item) => (
            <div
              key={`${item.href}-${item.label}`}
              className="flex flex-col gap-2 border-t border-[var(--rule)] py-4 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <PublicationLink href={item.href}>{item.label} -&gt;</PublicationLink>
              {item.note ? <span className="text-xs text-[var(--muted)]">{item.note}</span> : null}
            </div>
          ))}
        </div>
      );
  }
}

export default function LabPublicationArticle({
  publication,
  backHref = "/lab",
  backLabel = "Back to writing",
}: {
  publication: LabPublication;
  backHref?: string;
  backLabel?: string;
}) {
  const { metadata } = publication;
  const isPreLabEngineering = publication.provenance.origin === "historical-migration";
  const referenceCount = (metadata.evidence?.length ?? 0) + (publication.provenance.publicReferences?.length ?? 0);
  const details = [
    { label: "Publication type", value: metadata.type, accent: true },
    ...(isPreLabEngineering
      ? [{ label: "Archive placement", value: "Pre-Lab engineering", accent: true }]
      : []),
    { label: "Project", value: metadata.project?.name ?? "No affiliation" },
    { label: "Outcome", value: outcomeClassificationLabels[metadata.outcome.classification] },
    {
      label: "Review state",
      value: metadata.reviewStatus === "approved" ? "Human approved" : "Review pending",
      accent: metadata.reviewStatus === "approved",
    },
    { label: "Origin", value: provenanceOriginLabels[publication.provenance.origin] },
    { label: "Public references", value: `${referenceCount} references` },
    { label: "Read time", value: `${calculatePublicationReadTime(publication)} min` },
  ];

  return (
    <ArticleChrome
      backHref={backHref}
      backLabel={backLabel}
      eyebrow={`${isPreLabEngineering ? "Pre-Lab Engineering / " : ""}${metadata.id} / ${metadata.type} / ${formatPublicationDate(metadata.date)}`}
      title={metadata.title}
      subtitle={metadata.description}
      quote={publication.quote}
      details={[
        { label: "Project", value: metadata.project?.name ?? "Independent writing" },
        { label: "Read time", value: `${calculatePublicationReadTime(publication)} min` },
      ]}
      relatedPath={`/lab/${metadata.slug}`}
      contents={[
        ...publication.sections.map((section, index) => ({ href: `#section-${index + 1}`, label: section.title })),
        { href: "#evidence", label: "Evidence & publication details" },
      ]}
    >
      <div>
        <aside className="border-l-2 border-[var(--accent)] bg-[var(--panel)] p-5">
          <div className="text-xs font-semibold uppercase text-[var(--accent)]">
            Finding
          </div>
          <p className="mt-2 text-sm leading-7 text-[var(--ink)]">{metadata.outcome.summary}</p>
        </aside>
      </div>

      {publication.sections.map((section, sectionIndex) => (
        <ArticleSection
          id={`section-${sectionIndex + 1}`}
          key={`${sectionIndex}-${section.title}`}
          label={`${String(sectionIndex).padStart(2, "0")} / ${section.title}`}
          title={section.title}
        >
          {section.blocks.map((block, index) => (
            <PublicationContentBlock key={`${block.type}-${index}`} block={block} />
          ))}
        </ArticleSection>
      ))}

      <ArticleSection
        id="evidence"
        label={`${String(publication.sections.length).padStart(2, "0")} / Provenance`}
        title="Evidence & Public Provenance"
      >
        <dl className="grid grid-cols-2 gap-4 border-y border-[var(--rule)] py-4">
          {details.map((detail) => <div key={detail.label}><dt className="text-xs uppercase">{detail.label}</dt><dd className="mt-1 font-semibold text-[var(--ink)]">{detail.value}</dd></div>)}
        </dl>
        <p>{publication.provenance.summary}</p>
        {publication.provenance.generatedAt || publication.provenance.sourceRevision ? (
          <dl className="grid border-l border-t border-[var(--ink)] sm:grid-cols-2">
            {publication.provenance.generatedAt ? (
              <div className="border-b border-r border-[var(--ink)] p-4">
                <dt className="text-xs font-semibold uppercase text-[var(--muted)]">Generated</dt>
                <dd className="mt-2 text-sm text-[var(--ink)]">{publication.provenance.generatedAt}</dd>
              </div>
            ) : null}
            {publication.provenance.sourceRevision ? (
              <div className="border-b border-r border-[var(--ink)] p-4">
                <dt className="text-xs font-semibold uppercase text-[var(--muted)]">Public source revision</dt>
                <dd className="mt-2 text-sm text-[var(--ink)]">{publication.provenance.sourceRevision}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}
        {referenceCount > 0 ? (
          <>
            <p>
              Only sanitized, public references are recorded here. Private evidence bundles, local paths, logs, and
              agent or tool traces are outside this publication artifact.
            </p>
            <div className="border-b-2 border-[var(--ink)]">
              {[...(metadata.evidence ?? []), ...(publication.provenance.publicReferences ?? [])].map((reference) => (
                <div
                  key={reference.id}
                  className="grid gap-3 border-t border-[var(--rule)] py-5 sm:grid-cols-[150px_1fr]"
                >
                  <div className="text-xs font-semibold text-[var(--accent)]">
                    [{reference.id}]
                  </div>
                  <div>
                    <PublicationLink href={reference.href}>{reference.label} -&gt;</PublicationLink>
                    <div className="mt-2 text-xs uppercase text-[var(--muted)]">{reference.kind ?? "Reference"}</div>
                    {reference.note ? <p className="mt-2 text-sm text-[var(--muted)]">{reference.note}</p> : null}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </ArticleSection>
    </ArticleChrome>
  );
}
