import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import LabPublicationCard from "../components/LabPublicationCard";
import Navigation from "../components/Navigation";
import {
  formatPublicationDate,
  getLabConfig,
  getLabPublicationCollections,
} from "../../lib/lab/publications";
import { publicationTypes } from "../../lib/lab/types";

const labDescription =
  "Human-reviewed, evidence-backed publications from current OpenClaw engineering work, with earlier writing retained separately as history.";
const labSocialImage = "/images/lab/openclaw-lab-og.png";
const currentPublicationTypes = publicationTypes.filter((type) => type !== "Idea");

export const metadata: Metadata = {
  title: "OpenClaw Lab | Luke Payne",
  description: labDescription,
  alternates: {
    canonical: "/lab/",
  },
  openGraph: {
    title: "OpenClaw Lab | Luke Payne",
    description: labDescription,
    type: "website",
    images: [
      {
        url: labSocialImage,
        alt: "OpenClaw Lab by Luke Payne - human-directed, evidence-backed, locally operated",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Lab | Luke Payne",
    description: labDescription,
    images: [labSocialImage],
  },
};

export default function LabIndex() {
  const config = getLabConfig();
  const { current, preLabEngineering, ideas } = getLabPublicationCollections();
  const statusFields = [
    {
      label: "Lab status",
      value: config.status.label,
      detail: config.status.detail,
      accent: true,
    },
    {
      label: "Publication gate",
      value: config.governance.label,
      detail: config.governance.detail,
    },
    {
      label: "Current publications",
      value: String(current.length).padStart(2, "0"),
      detail: "Approved OpenClaw records",
    },
    {
      label: "Last update",
      value: formatPublicationDate(config.lastUpdated),
      detail: config.identifier,
    },
  ];

  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Lab" className="py-12 md:py-16">
          <div className="border-t-2 border-[var(--ink)] pt-5">
            <div className="text-xs font-semibold uppercase text-[var(--accent)]">{config.identifier}</div>
            <h1 className="mt-5 text-5xl font-bold uppercase leading-none sm:text-6xl md:text-7xl">{config.name}</h1>
            <p className="mt-6 max-w-4xl text-xl font-medium leading-8 md:text-2xl">{config.description}</p>
            <p className="mt-4 text-sm font-semibold uppercase text-[var(--muted)]">{config.operatingPrinciple}</p>
          </div>

          <div className="mt-10 grid border-l border-t border-[var(--ink)] sm:grid-cols-2 lg:grid-cols-4">
            {statusFields.map((field) => (
              <div key={field.label} className="min-h-28 border-b border-r border-[var(--ink)] p-4">
                <div className="text-[10px] font-semibold uppercase text-[var(--muted)]">{field.label}</div>
                <div
                  className={`mt-3 text-sm font-bold uppercase ${
                    field.accent ? "text-[var(--accent)]" : "text-[var(--ink)]"
                  }`}
                >
                  {field.value}
                </div>
                <div className="mt-2 text-[10px] uppercase leading-5 text-[var(--muted)]">{field.detail}</div>
              </div>
            ))}
          </div>

          <div
            id="current-publications"
            data-publication-era="current"
            className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8"
          >
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">00 / Current</div>
            <div>
              <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-lg font-bold uppercase">Current Publications</h2>
                <span className="text-xs font-semibold uppercase text-[var(--muted)]">
                  {String(current.length).padStart(2, "0")} approved
                </span>
              </div>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                Reviewed records from current OpenClaw engineering work. Every entry is a structured artifact with an
                explicit human approval state and public-safe evidence or provenance.
              </p>

              <div className="mt-5 flex flex-wrap border-l border-t border-[var(--rule)]">
                {currentPublicationTypes.map((type) => (
                  <span
                    key={type}
                    className="border-b border-r border-[var(--rule)] px-3 py-2 text-[10px] font-semibold uppercase text-[var(--muted)]"
                  >
                    {type}
                  </span>
                ))}
              </div>

              {current.length > 0 ? (
                <div className="mt-7 border-b-2 border-[var(--ink)]">
                  {current.map((publication, index) => (
                    <LabPublicationCard
                      key={`${publication.source}-${publication.id}`}
                      publication={publication}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-7 border-y-2 border-[var(--ink)] py-7">
                  <div className="text-xs font-semibold uppercase text-[var(--accent)]">
                    Publication queue / human review
                  </div>
                  <h3 className="mt-3 max-w-3xl text-xl font-bold">No current Lab reports have been published yet.</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                    The first reviewed OpenClaw reports are being prepared. Approved publication artifacts will enter
                    this register automatically.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">01 / Protocol</div>
            <div>
              <div className="border-t-2 border-[var(--ink)] pt-5">
                <h2 className="text-lg font-bold uppercase">Operating Standard</h2>
              </div>
              <div className="mt-5 grid border-l border-t border-[var(--ink)] md:grid-cols-3">
                {[
                  [
                    "Evidence before claims",
                    "Published records should point only to sanitized tests, public artifacts, code, or clearly marked source material.",
                  ],
                  [
                    "Human approval required",
                    "A structured artifact cannot be published until its explicit review state is approved.",
                  ],
                  [
                    "Negative results count",
                    "Unsupported hypotheses and inconclusive work remain first-class outcomes when they improve the next decision.",
                  ],
                ].map(([title, body], index) => (
                  <div key={title} className="border-b border-r border-[var(--ink)] p-5">
                    <div className="text-xs font-semibold text-[var(--accent)]">
                      [{String(index + 1).padStart(2, "0")}]
                    </div>
                    <h3 className="mt-3 text-sm font-bold">{title}</h3>
                    <p className="mt-3 text-xs leading-6 text-[var(--muted)]">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="archive"
            data-publication-era="archive"
            className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8"
          >
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">02 / Archive</div>
            <div>
              <div className="border-t-2 border-[var(--ink)] pt-5">
                <h2 className="text-lg font-bold uppercase">Archive</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                  Earlier engineering and speculative writing is retained transparently, but it is not part of the
                  Current Publications register.
                </p>
              </div>

              <div className="mt-5 grid border-l border-t border-[var(--rule)] md:grid-cols-2">
                <section className="border-b border-r border-[var(--rule)] p-5 md:p-6">
                  <div className="text-[10px] font-semibold uppercase text-[var(--accent)]">
                    Historical engineering
                  </div>
                  <h3 className="mt-3 text-base font-bold uppercase">Pre-Lab Engineering</h3>
                  <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
                    Human-reviewed migrations of technical work that predates OpenClaw Lab. These records remain
                    public without being presented as current OpenClaw results.
                  </p>

                  <div className="mt-5 border-b border-[var(--rule)]">
                    {preLabEngineering.map((publication) => (
                      <Link
                        key={publication.id}
                        href={publication.href}
                        className="group block border-t border-[var(--rule)] py-5 transition-colors hover:bg-[var(--paper-deep)]"
                      >
                        <div className="text-[10px] font-semibold uppercase text-[var(--muted)]">
                          Pre-OpenClaw / Human-reviewed migration
                        </div>
                        <h4 className="mt-2 font-bold transition-colors group-hover:text-[var(--accent)]">
                          {publication.title}
                        </h4>
                        <div className="mt-2 text-[10px] font-semibold uppercase text-[var(--muted)]">
                          {publication.type} / {formatPublicationDate(publication.date)}
                        </div>
                        <div className="mt-3 text-xs font-semibold uppercase text-[var(--accent)]">Read -&gt;</div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="border-b border-r border-[var(--rule)] p-5 md:p-6">
                  <div className="text-[10px] font-semibold uppercase text-[var(--accent)]">Retained writing</div>
                  <h3 className="mt-3 text-base font-bold uppercase">Research &amp; Ideas</h3>
                  <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
                    Engineering thoughts, research notes, systems thinking, and speculative thought experiments remain
                    in their original Ideas archive.
                  </p>
                  <div className="mt-5 text-[10px] font-semibold uppercase text-[var(--muted)]">
                    {String(ideas.length).padStart(2, "0")} retained entries / separate archive
                  </div>
                  <Link href="/ideas" className="mono-button mt-5">
                    Browse Ideas Archive -&gt;
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
