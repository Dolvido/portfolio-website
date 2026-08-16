import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProfileImage from "./components/ProfileImage";
import ProjectCard from "./components/ProjectCard";
import { capabilities, overviewRows, profile, projects } from "./data/portfolio";
import {
  formatPublicationDate,
  getHomepageLabPublications,
  getLabConfig,
} from "../lib/lab/publications";
import { outcomeClassificationLabels } from "../lib/lab/types";

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);
  const labConfig = getLabConfig();
  const labHighlights = getHomepageLabPublications(2);

  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Index" className="py-12 md:py-16">
          <div className="grid grid-cols-2 border-b border-t-2 border-[var(--ink)] text-[10px] font-semibold uppercase text-[var(--muted)] md:grid-cols-4">
            <div className="border-r border-[var(--rule)] py-3 pr-3">ID LP-2026</div>
            <div className="border-r border-[var(--rule)] px-3 py-3">Rev 2026.06</div>
            <div className="border-r border-[var(--rule)] py-3 pr-3 md:px-3">Role SWE / AI</div>
            <div className="py-3 pl-3 text-[var(--accent)]">Status Open</div>
          </div>

          <div className="grid gap-10 py-12 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <h1 className="text-6xl font-bold uppercase leading-none sm:text-7xl md:text-8xl lg:text-[7rem]">
                Luke
                <br />
                Payne
              </h1>
              <p className="mt-6 text-sm font-semibold uppercase text-[var(--muted)] md:text-base">
                {profile.role}
              </p>
            </div>
            <div className="justify-self-start lg:justify-self-end">
              <ProfileImage />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[84px_1fr] md:gap-8">
            <div className="text-xs text-[var(--faint)]">00</div>
            <div>
              <div className="mb-5 text-xs font-semibold uppercase text-[var(--faint)]">Overview</div>
              <p className="max-w-3xl text-2xl font-medium leading-snug md:text-3xl">
                I build practical AI and full-stack software with clear system boundaries and testable engineering.
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                Agentic workflows, local-first developer tools, retrieval systems, and production-minded web
                applications with tests, deployment checks, and reproducible behavior.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[84px_1fr] md:gap-8">
            <div />
            <div className="text-sm">
              {overviewRows.map((row, index) => (
                <div
                  key={row.label}
                  className={`flex flex-col gap-2 border-t border-[var(--dot-rule)] py-3 sm:flex-row sm:items-baseline sm:gap-5 ${
                    index === overviewRows.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="w-32 flex-shrink-0 uppercase text-[var(--muted)]">{row.label}</span>
                  <span className="text-[var(--accent)]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-[84px_1fr] md:gap-8">
            <div className="text-xs text-[var(--faint)]">01</div>
            <div>
              <div className="mb-5 flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold uppercase">Featured Projects</h2>
                <Link href="/projects" className="accent-link text-xs font-semibold uppercase">
                  All projects -&gt;
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {featuredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    category={project.category}
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    href={`/projects#${project.id}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-[84px_1fr] md:gap-8">
            <div className="text-xs text-[var(--faint)]">02</div>
            <div>
              <div className="mb-5 flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold uppercase">OpenClaw Lab</h2>
                  <p className="mt-2 max-w-2xl text-xs leading-6 text-[var(--muted)]">
                    {labConfig.description} {labConfig.operatingPrinciple}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase">
                  <span className="text-[var(--accent)]">
                    {labConfig.status.label} / {formatPublicationDate(labConfig.lastUpdated)}
                  </span>
                  <Link href="/lab" className="accent-link">
                    Enter the lab -&gt;
                  </Link>
                </div>
              </div>

              <div className="border-b-2 border-[var(--ink)]">
                {labHighlights.map((publication, index) => (
                  <Link
                    key={publication.id}
                    href={publication.href}
                    className={`grid gap-4 border-t py-5 transition-colors hover:bg-[var(--paper-deep)] md:grid-cols-[150px_1fr_auto] md:items-center ${
                      index === 0 ? "border-[var(--ink)] border-t-2" : "border-[var(--rule)]"
                    }`}
                  >
                    <div className="space-y-1 text-xs font-semibold uppercase text-[var(--muted)]">
                      <div className="text-[var(--accent)]">{publication.type}</div>
                      {publication.date ? <time dateTime={publication.date}>{formatPublicationDate(publication.date)}</time> : null}
                    </div>
                    <div>
                      <h3 className="font-bold">{publication.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                        Project / {publication.project?.name ?? "Unassigned"} /{" "}
                        {outcomeClassificationLabels[publication.outcome.classification]}
                      </p>
                    </div>
                    <div className="text-xs font-semibold uppercase text-[var(--accent)]">Read -&gt;</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-[84px_1fr] md:gap-8">
            <div className="text-xs text-[var(--faint)]">03</div>
            <div>
              <div className="mb-5 border-t-2 border-[var(--ink)] pt-5 text-lg font-bold uppercase">Capabilities</div>
              <div className="grid border border-[var(--ink)] md:grid-cols-2">
                {capabilities.map((capability, index) => (
                  <div
                    key={capability.code}
                    className={`p-5 ${
                      index % 2 === 0 ? "md:border-r" : ""
                    } ${index < 2 ? "border-b" : ""} border-[var(--rule)]`}
                  >
                    <div className="mb-3 text-xs font-semibold text-[var(--accent)]">[{capability.code}]</div>
                    <h3 className="mb-2 text-sm font-bold">{capability.title}</h3>
                    <p className="text-xs leading-6 text-[var(--muted)]">{capability.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 border-y-2 border-[var(--ink)] py-8">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-xs font-semibold uppercase text-[var(--faint)]">Availability</div>
                <p className="mt-2 text-xl font-semibold">Available for AI and full-stack engineering work.</p>
              </div>
              <Link href="/contact" className="mono-button primary">
                Get in touch -&gt;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
