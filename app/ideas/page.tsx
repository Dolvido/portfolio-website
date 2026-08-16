import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { ideas } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Ideas Archive | OpenClaw Lab",
  description: "Research notes and speculative systems thinking from Luke Payne, retained within the OpenClaw Lab archive.",
  alternates: {
    canonical: "/ideas/",
  },
};

export default function Ideas() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Ideas" className="py-12 md:py-16">
          <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 md:flex-row md:items-baseline md:justify-between">
            <h1 className="text-4xl font-bold uppercase md:text-5xl">Ideas</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase text-[var(--muted)]">
              <span>Research notes / retained archive</span>
              <Link href="/lab" className="accent-link">
                OpenClaw Lab -&gt;
              </Link>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
            Notes on AI-first software engineering, responsible autonomy, evaluation, observability, and speculative
            safety. Some pieces are practical field notes; others are thought experiments for stress-testing how complex
            systems fail. These notes now appear in the Lab publication register under the Idea taxonomy.
          </p>

          <div className="mt-12 border-b-2 border-[var(--ink)]">
            {ideas.map((idea, index) => (
              <Link
                key={idea.id}
                href={idea.href}
                className={`grid gap-6 border-t ${
                  index === 0 ? "border-[var(--ink)] border-t-2" : "border-[var(--rule)]"
                } py-8 transition-colors hover:bg-[var(--paper-deep)] md:grid-cols-[150px_1fr_auto] md:items-start`}
              >
                <div className="space-y-2 text-xs font-semibold uppercase text-[var(--muted)]">
                  <div className="text-[var(--ink)]">{idea.id}</div>
                  <div>{idea.type}</div>
                  <div className="text-[var(--accent)]">{idea.theme}</div>
                </div>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold">{idea.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{idea.description}</p>
                </div>
                <div className="text-xs font-semibold uppercase text-[var(--accent)]">Read -&gt;</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
