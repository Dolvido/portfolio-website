import SiteLink from "./SiteLink";

export default function DraftArticleLink() {
  return <aside className="my-6 border-l-2 border-[var(--orange)] pl-4">
    <p className="eyebrow text-[var(--orange)]">Local draft / review pending</p>
    <SiteLink href="/drafts/how-i-work-with-ai/" className="accent-link inline-block py-3">How to finish projects with dot →</SiteLink>
    <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">An early adopter&apos;s field notes on defining done, setting useful rules, reviewing artifacts and handling the rough edges. A living guide, grounded in what actually gets finished.</p>
  </aside>;
}
