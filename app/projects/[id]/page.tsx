import type { Metadata } from "next";
import SiteLink from "../../components/SiteLink";
import BiCDemo from "../../components/BiCDemo";
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

function ProjectAction({href,children}:{href:string;children:React.ReactNode}){return <SiteLink href={href} className="mono-button">{children}</SiteLink>;}

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
        relatedPath={project.caseStudyUrl}
        contents={[
          { href: "#problem", label: "Problem" },
          { href: "#example", label: "Concrete example" },
          { href: "#approach", label: "System approach" },
          { href: "#highlights", label: "Project highlights" },
          { href: "#insights", label: "What this shows" },
          { href: "#explore", label: "Demo, code & evidence" },
        ]}
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

        {project.id === 'bic' && <figure className="artifact mt-8"><div className="artifact-top"><span>RECORDED CPU DEMO</span><span>REPLAY / NOT LIVE INFERENCE</span></div><BiCDemo/><figcaption>Actual published observation record. Illustrations, not a benchmark; the research candidate failed the full promotion gate.</figcaption></figure>}
        <ArticleSection id="problem" label="00 / Problem" title="Problem">
          <p>{project.caseStudy.problem}</p>
        </ArticleSection>

        <ArticleSection id="example" label="01 / Example" title="Concrete Example">
          <p>{project.caseStudy.example}</p>
        </ArticleSection>

        <ArticleSection id="approach" label="02 / Approach" title="System Approach">
          <div className="space-y-0">
            {project.caseStudy.approach.map((item, index) => (
              <NumberedPanel key={item} number={String(index + 1)} title={`Step ${index + 1}`}>
                <p>{item}</p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection id="highlights" label="03 / Evidence" title="Project Highlights">
          <ul className="grid gap-2 md:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="border-t border-[var(--dot-rule)] pt-2">
                {highlight}
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection id="insights" label="04 / Insights" title="What This Shows">
          <ul className="space-y-2">
            {project.caseStudy.insights.map((insight) => (
              <li key={insight} className="border-t border-[var(--dot-rule)] pt-2">
                {insight}
              </li>
            ))}
          </ul>
        </ArticleSection>

        <ArticleSection id="explore" label="05 / Links" title="Explore">
          <div className="flex flex-wrap gap-3">
            <ProjectAction href="/projects">All Work -&gt;</ProjectAction>
            {demoUrl ? <ProjectAction href={demoUrl}>View Demo -&gt;</ProjectAction> : null}
            {project.githubUrl ? <ProjectAction href={project.githubUrl}>View Code -&gt;</ProjectAction> : null}
            {project.evidenceLinks?.map((link) => (
              <ProjectAction key={link.href} href={link.href}>{link.label} -&gt;</ProjectAction>
            ))}
          </div>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
