import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import DraftArticleLink from "../components/DraftArticleLink";
import { formatPublicationDate, getLabPublicationCollections } from "../../lib/lab/publications";

export const metadata: Metadata = {
  title: "Writing & Experiments | Luke Payne",
  description: "Experiments, engineering decisions, and project reading guides, with earlier and speculative writing in a separate archive.",
  alternates: { canonical: "/lab/" },
  openGraph: { title: "Writing & Experiments | Luke Payne", images: ["/images/lab/openclaw-lab-og.png"] },
  twitter: { card: "summary_large_image", title: "Writing & Experiments | Luke Payne", images: ["/images/lab/openclaw-lab-og.png"] },
};

export default function WritingIndex() {
  const { current, preLabEngineering, ideas } = getLabPublicationCollections();
  const groups = Array.from(new Set(current.map((publication) => publication.project?.name ?? "Independent experiments")));
  return (
    <div className="portfolio-shell">
      <Navigation />
      <main id="main-content" className="portfolio-content container">
        <section data-screen-label="Writing" className="py-6 md:py-12">
          <header className="border-t-2 border-[var(--ink)] pt-5">
            <h1 className="text-4xl font-bold uppercase leading-tight md:text-6xl">Writing &amp; experiments</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">What I built, what I measured, and what changed my mind. Start with a project below or explore the earlier writing.</p>
            <nav aria-label="Writing collections" className="mt-5 flex flex-wrap gap-3">
              <a href="#current-publications" className="mono-button">Project writing</a>
              <a href="#archive" className="mono-button">Earlier writing</a>
              <Link href="/ideas" className="mono-button">Ideas archive</Link>
            </nav>
          </header>
          <DraftArticleLink />
          <section id="current-publications" data-publication-era="current" className="mt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-t-2 border-[var(--ink)] pt-5">
              <h2 className="text-xl font-bold uppercase">Project writing</h2>
              <span className="text-xs text-[var(--muted)]">{current.length} publications / {groups.length} projects</span>
            </div>
            {groups.map((name) => {
              const entries = current.filter((publication) => (publication.project?.name ?? "Independent experiments") === name);
              const isOpenClaw = name === "OpenClaw Evolutionary Coding Lab";
              const overview = entries.find((publication) => publication.slug === "openclaw-engine-progress");
              return (
                <section key={name} className="mt-8 border border-[var(--rule)] p-5 md:p-7">
                  <h3 className="text-xl font-bold">{name}</h3>
                  {isOpenClaw ? (
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">An experimental coding workflow. Start with the overview, then follow eight engineering notes from the same snapshot. The complete coding demonstration remains unfinished.</p>
                  ) : name === "LLM Tool Calling Lab" ? (
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">A local ML chatbot and a controlled comparison. Added planning showed no observed completion benefit in the frozen synthetic campaign. <Link href="/projects/llm-tool-calling-lab" className="accent-link">Read the short case study -&gt;</Link></p>
                  ) : null}
                  {overview ? <Link href={overview.href} className="mono-button primary my-5">Start here: series overview -&gt;</Link> : null}
                  <ol className="mt-4 divide-y divide-[var(--rule)]">
                    {entries.filter((publication) => publication !== overview).map((publication) => (
                      <li key={publication.id} className="py-4">
                        <Link href={publication.href} className="accent-link inline-block py-1 font-semibold">{publication.title} -&gt;</Link>
                        <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{publication.description}</p>
                        <p className="mt-2 text-xs text-[var(--muted)]">{publication.type} / <time dateTime={publication.date}>{formatPublicationDate(publication.date)}</time></p>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
            {!current.length ? <p className="mt-6">No current Lab reports have been published yet.</p> : null}
          </section>
          <section id="archive" data-publication-era="archive" className="mt-10 border-t-2 border-[var(--ink)] pt-5">
            <h2 className="text-xl font-bold uppercase">Earlier writing</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Historical project notes and independent ideas remain available here. They are separate from the current experiments above.</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="border border-[var(--rule)] p-5">
                <h3 className="font-bold">Earlier engineering</h3>
                {preLabEngineering.map((publication) => <div key={publication.id} className="mt-4"><Link href={publication.href} className="accent-link inline-block py-2">{publication.title} -&gt;</Link><p className="text-xs text-[var(--muted)]">Historical article / {formatPublicationDate(publication.date)}</p></div>)}
              </div>
              <div className="border border-[var(--rule)] p-5">
                <h3 className="font-bold">Research &amp; ideas</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{ideas.length} retained essays on evaluation, observability, and safety. Speculative thought experiments are labeled separately.</p>
                <Link href="/ideas" className="mono-button mt-4">Browse Ideas Archive -&gt;</Link>
              </div>
            </div>
          </section>
          <details className="mt-10 border-t border-[var(--rule)] py-4">
            <summary className="cursor-pointer py-2 text-sm font-semibold">How these articles are reviewed</summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">Published experiment records retain their review state, evidence references, and limitations. Negative results count. Historical writing and speculative proposals do not establish new experimental results.</p>
          </details>
        </section>
      </main>
      <Footer />
    </div>
  );
}
