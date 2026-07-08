import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { blogPosts } from "../data/portfolio";

export default function BlogIndex() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Blog" className="py-12 md:py-16">
          <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 md:flex-row md:items-baseline md:justify-between">
            <h1 className="text-4xl font-bold uppercase md:text-5xl">Blog</h1>
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">Notes / project logs</div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
            Project notes and writing on software engineering, AI, and developer tools.
          </p>

          <div className="mt-12 border-b-2 border-[var(--ink)]">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={post.href}
                className="grid gap-6 border-t-2 border-[var(--ink)] py-8 transition-colors hover:bg-[var(--paper-deep)] md:grid-cols-[150px_1fr_auto] md:items-start"
              >
                <div className="space-y-2 text-xs font-semibold uppercase text-[var(--muted)]">
                  <div className="text-[var(--ink)]">{post.id}</div>
                  <div>{post.date}</div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="border border-[var(--rule)] px-2 py-1 text-xs text-[var(--muted)]">
                        {tag}
                      </span>
                    ))}
                  </div>
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
