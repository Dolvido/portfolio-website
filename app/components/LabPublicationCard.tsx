import Link from "next/link";
import { formatPublicationDate } from "../../lib/lab/publications";
import { outcomeClassificationLabels, PublicationSummary } from "../../lib/lab/types";

export default function LabPublicationCard({
  publication,
  index,
}: {
  publication: PublicationSummary;
  index: number;
}) {
  const evidenceCount = publication.evidence?.length ?? 0;

  return (
    <Link
      href={publication.href}
      className={`group grid gap-6 border-t py-8 transition-colors hover:bg-[var(--paper-deep)] md:grid-cols-[150px_1fr_190px] md:items-start ${
        index === 0 ? "border-[var(--ink)] border-t-2" : "border-[var(--rule)]"
      }`}
    >
      <div className="space-y-2 text-xs font-semibold uppercase text-[var(--muted)]">
        <div className="text-[var(--ink)]">{publication.id}</div>
        {publication.date ? <time dateTime={publication.date}>{formatPublicationDate(publication.date)}</time> : null}
        <div className="text-[var(--accent)]">{publication.type}</div>
      </div>

      <div className="max-w-3xl">
        <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase text-[var(--muted)]">
          <span className="border border-[var(--rule)] px-2 py-1">
            Project / {publication.project?.name ?? "Unassigned"}
          </span>
          {publication.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="border border-[var(--rule)] px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-bold transition-colors group-hover:text-[var(--accent)]">{publication.title}</h2>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{publication.description}</p>
      </div>

      <div className="space-y-3 text-xs uppercase text-[var(--muted)] md:text-right">
        <div>
          <div className="text-[10px] text-[var(--muted)]">Outcome</div>
          <div className="mt-1 font-semibold text-[var(--ink)]">
            {outcomeClassificationLabels[publication.outcome.classification]}
          </div>
          <div className="mt-2 normal-case leading-5">{publication.outcome.summary}</div>
        </div>
        <div className="font-semibold text-[var(--accent)]">
          {publication.reviewStatus === "approved" ? "Human approved" : "Review pending"}
        </div>
        {evidenceCount > 0 ? <div>{String(evidenceCount).padStart(2, "0")} evidence refs</div> : null}
        <div className="font-semibold text-[var(--accent)]">Read -&gt;</div>
      </div>
    </Link>
  );
}
