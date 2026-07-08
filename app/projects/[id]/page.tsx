import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";
import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import { getProjectById, projects } from "../../data/portfolio";

type ProjectCaseStudyPageProps = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }: ProjectCaseStudyPageProps): Metadata {
  const project = getProjectById(params.id);

  return {
    title: project ? `${project.title} Case Study | Luke Payne` : "Project Case Study | Luke Payne",
    description: project?.description,
  };
}

function ProjectAction({
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

export default function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const demoUrl = project.demoUrl && project.demoUrl !== "#demo" ? project.demoUrl : undefined;

  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/projects"
        backLabel="Back to work"
        eyebrow={`CASE STUDY / ${project.category} / ${project.status || "Selected project"}`}
        title={`${project.title} Case Study`}
        subtitle={project.description}
        quote={project.caseStudy.insights[0]}
      >
        <div className="grid gap-4 border-y-2 border-[var(--ink)] py-5 text-xs font-semibold uppercase text-[var(--muted)] md:grid-cols-4">
          <div>
            <div className="text-[var(--faint)]">Project</div>
            <div className="mt-2 text-[var(--ink)]">{project.id}</div>
          </div>
          <div>
            <div className="text-[var(--faint)]">Source</div>
            <div className="mt-2 text-[var(--ink)]">{project.caseStudy.source}</div>
          </div>
          <div>
            <div className="text-[var(--faint)]">Status</div>
            <div className="mt-2 text-[var(--accent)]">{project.status || "Selected work"}</div>
          </div>
          <div>
            <div className="text-[var(--faint)]">Stack</div>
            <div className="mt-2 text-[var(--ink)]">{project.tags.slice(0, 3).join(" / ")}</div>
          </div>
        </div>

        {project.disclaimer ? (
          <p className="mt-8 border-l-2 border-[var(--accent)] pl-4 text-xs leading-6 text-[var(--muted)]">
            {project.disclaimer}
          </p>
        ) : null}

        <ArticleSection label="00 / Problem" title="Problem">
          <p>{project.caseStudy.problem}</p>
        </ArticleSection>

        <ArticleSection label="01 / Example" title="Concrete Example">
          <p>{project.caseStudy.example}</p>
        </ArticleSection>

        <ArticleSection label="02 / Approach" title="System Approach">
          <div className="space-y-0">
            {project.caseStudy.approach.map((item, index) => (
              <NumberedPanel key={item} number={String(index + 1)} title={`Step ${index + 1}`}>
                <p>{item}</p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="03 / Evidence" title="Project Highlights">
          <ul className="grid gap-2 md:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="border-t border-[var(--dot-rule)] pt-2">
                {highlight}
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection label="04 / Insights" title="What This Shows">
          <ul className="space-y-2">
            {project.caseStudy.insights.map((insight) => (
              <li key={insight} className="border-t border-[var(--dot-rule)] pt-2">
                {insight}
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection label="05 / Links" title="Explore">
          <div className="flex flex-wrap gap-3">
            <ProjectAction href="/projects">All Work -&gt;</ProjectAction>
            {demoUrl ? <ProjectAction href={demoUrl}>View Demo -&gt;</ProjectAction> : null}
            {project.githubUrl ? <ProjectAction href={project.githubUrl}>View Code -&gt;</ProjectAction> : null}
          </div>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
