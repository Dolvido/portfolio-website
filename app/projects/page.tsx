import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { projects } from "../data/portfolio";

function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className = "mono-button";

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Projects() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Work" className="py-12 md:py-16">
          <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 md:flex-row md:items-baseline md:justify-between">
            <h1 className="text-4xl font-bold uppercase md:text-5xl">Work</h1>
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">
              {String(projects.length).padStart(2, "0")} entries / strongest current projects
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--muted)]">
            Selected full-stack products, AI systems, local-first tools, and reproducible engineering projects. The
            emphasis here is practical system design: clear boundaries, inspectable behavior, and quality gates.
          </p>

          <div className="mt-12 border-b-2 border-[var(--ink)]">
            {projects.map((project, index) => {
              const demoUrl = project.demoUrl && project.demoUrl !== "#demo" ? project.demoUrl : undefined;

              return (
                <article
                  id={project.id}
                  key={project.id}
                  className={`scroll-mt-28 grid gap-8 border-t ${
                    index === 0 ? "border-[var(--ink)] border-t-2" : "border-[var(--rule)]"
                  } py-8 lg:grid-cols-[150px_1fr]`}
                >
                  <div className="space-y-2 text-xs font-semibold uppercase text-[var(--muted)]">
                    <div className="text-[var(--ink)]">PRJ-{String(index + 1).padStart(3, "0")}</div>
                    <div>{project.id}</div>
                    <div>{project.category}</div>
                    {project.status ? <div className="text-[var(--accent)]">{project.status}</div> : null}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="border border-[var(--rule)] px-2 py-1 text-xs text-[var(--muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="mt-5 max-w-4xl text-sm leading-7 text-[var(--muted)]">{project.description}</p>

                    {project.disclaimer ? (
                      <p className="mt-4 max-w-4xl border-l-2 border-[var(--accent)] pl-4 text-xs leading-6 text-[var(--muted)]">
                        {project.disclaimer}
                      </p>
                    ) : null}

                    <ul className="mt-5 grid gap-2 text-sm text-[var(--muted)] md:grid-cols-2">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="border-t border-[var(--dot-rule)] pt-2">
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-3">
                      {demoUrl ? <ProjectLink href={demoUrl}>View Demo -&gt;</ProjectLink> : null}
                      {project.githubUrl ? <ProjectLink href={project.githubUrl}>View Code -&gt;</ProjectLink> : null}
                      <ProjectLink href={project.caseStudyUrl}>Read Case Study -&gt;</ProjectLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
