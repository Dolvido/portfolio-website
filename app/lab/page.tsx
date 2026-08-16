import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import LabPublicationCard from "../components/LabPublicationCard";
import Navigation from "../components/Navigation";
import {
  formatPublicationDate,
  getLabConfig,
  getPublicationRegister,
  getPublishedLabPublications,
} from "../../lib/lab/publications";
import { publicationTypes } from "../../lib/lab/types";

const labDescription =
  "Human-approved engineering reports, project notes, and retained research writing published as structured artifacts.";
const labSocialImage = "/images/lab/openclaw-lab-og.png";

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
  const publications = getPublicationRegister();
  const reportCount = getPublishedLabPublications().length;
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
      label: "Published artifacts",
      value: String(reportCount).padStart(2, "0"),
      detail: "Approved structured records",
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

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">00 / Register</div>
            <div>
              <div className="flex flex-col gap-3 border-t-2 border-[var(--ink)] pt-5 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-lg font-bold uppercase">Publication Register</h2>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase text-[var(--muted)]">
                  <span>{String(publications.length).padStart(2, "0")} entries</span>
                  <Link href="/ideas" className="accent-link">
                    Ideas archive -&gt;
                  </Link>
                </div>
              </div>

              <div className="mt-5 border-b-2 border-[var(--ink)]">
                {publications.map((publication, index) => (
                  <LabPublicationCard
                    key={`${publication.source}-${publication.id}`}
                    publication={publication}
                    index={index}
                  />
                ))}
              </div>
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

          <div className="mt-14 grid gap-6 md:grid-cols-[150px_1fr] md:gap-8">
            <div className="text-xs font-semibold uppercase text-[var(--muted)]">02 / Taxonomy</div>
            <div>
              <h2 className="border-t-2 border-[var(--ink)] pt-5 text-lg font-bold uppercase">Publication Types</h2>
              <div className="mt-5 grid grid-cols-2 border-l border-t border-[var(--rule)] sm:grid-cols-3 lg:grid-cols-6">
                {publicationTypes.map((type, index) => (
                  <div key={type} className="border-b border-r border-[var(--rule)] p-3 text-xs font-semibold uppercase">
                    <span className="mr-2 text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
                    {type}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
