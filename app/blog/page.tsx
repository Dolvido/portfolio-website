import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export const metadata: Metadata = {
  title: "Blog Archive | Luke Payne",
  description: "Compatibility route for writing now organized through OpenClaw Lab.",
  alternates: {
    canonical: "/lab/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BlogArchive() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Blog Archive" className="py-12 md:py-16">
          <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 md:flex-row md:items-baseline md:justify-between">
            <h1 className="text-4xl font-bold uppercase md:text-5xl">Blog Archive</h1>
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">Compatibility route / retained</div>
          </div>

          <div className="mt-8 grid gap-6 border-y-2 border-[var(--ink)] py-6 md:grid-cols-[1fr_auto] md:items-center">
            <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
              Current engineering publications live in OpenClaw Lab. Pre-Lab engineering and the separate Research &amp;
              Ideas Archive remain available as clearly labeled history. Existing blog URLs are preserved and point to
              their canonical destinations.
            </p>
            <Link href="/lab" className="mono-button primary">
              Enter the lab -&gt;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
