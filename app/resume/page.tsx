import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { education, experience, profile, resumeProjects, resumeSkillGroups, resumeSummary } from "../data/portfolio";

export default function Resume() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Resume" className="py-12 md:py-16">
          <div className="border-t-2 border-[var(--ink)] pt-5">
            <h1 className="text-4xl font-bold uppercase md:text-5xl">Resume</h1>
            <p className="mt-3 text-sm font-semibold uppercase text-[var(--accent)]">{profile.role}</p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--muted)]">
              <span>{profile.location}</span>
              <a href={profile.phoneHref} className="accent-link">
                {profile.phone}
              </a>
              <a href={`mailto:${profile.email}`} className="accent-link">
                {profile.email}
              </a>
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="accent-link">
                Portfolio -&gt;
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="accent-link">
                LinkedIn -&gt;
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="accent-link">
                GitHub -&gt;
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--faint)]">00 / Summary</div>
            <p className="max-w-4xl text-base leading-8 text-[var(--muted)]">{resumeSummary}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--faint)]">01 / Technical Skills</div>
            <div className="grid border border-[var(--ink)] md:grid-cols-2">
              {resumeSkillGroups.map((skill, index) => (
                <div
                  key={skill.title}
                  className={`p-5 ${
                    index % 2 === 0 ? "md:border-r" : ""
                  } ${index < resumeSkillGroups.length - 1 ? "border-b" : ""} ${
                    index >= resumeSkillGroups.length - 2 ? "md:border-b-0" : ""
                  } border-[var(--rule)]`}
                >
                  <h2 className="mb-3 text-sm font-bold">{skill.title}</h2>
                  <p className="text-xs leading-6 text-[var(--muted)]">{skill.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--faint)]">02 / Experience</div>
            <div className="border-b-2 border-[var(--ink)]">
              {experience.map((job, index) => (
                <article
                  key={`${job.title}-${job.dates}`}
                  className={`grid gap-4 border-t ${
                    index === 0 ? "border-[var(--ink)] border-t-2" : "border-[var(--rule)]"
                  } py-6 md:grid-cols-[150px_1fr] md:gap-6`}
                >
                  <div className="text-xs font-semibold text-[var(--accent)]">{job.dates}</div>
                  <div>
                    <h2 className="text-lg font-bold">{job.title}</h2>
                    <p className="mt-1 text-sm text-[var(--faint)]">{job.detail}</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)]">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--faint)]">03 / Selected Projects</div>
            <div className="border-b-2 border-[var(--ink)]">
              {resumeProjects.map((project, index) => (
                <article
                  key={project.title}
                  className={`border-t ${
                    index === 0 ? "border-[var(--ink)] border-t-2" : "border-[var(--rule)]"
                  } py-6`}
                >
                  <h2 className="text-lg font-bold">{project.title}</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)]">
                    {project.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--faint)]">04 / Education</div>
            <div>
              {education.map((item, index) => (
                <div
                  key={item.degree}
                  className={`flex flex-col gap-2 border-t border-[var(--dot-rule)] py-4 sm:flex-row sm:items-baseline sm:justify-between ${
                    index === education.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div>
                    <div className="font-bold">{item.degree}</div>
                    <div className="text-sm text-[var(--muted)]">
                      {item.school} / {item.location}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-[var(--accent)]">{item.dates}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
