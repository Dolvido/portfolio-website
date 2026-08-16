import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import LabPublicationArticle from "../../components/LabPublicationArticle";
import Navigation from "../../components/Navigation";
import { getLabPublicationBySlug } from "../../../lib/lab/publications";

const publication = getLabPublicationBySlug("autocritic");

export const metadata: Metadata = {
  title: publication ? `${publication.metadata.title} | Pre-Lab Engineering` : "AutoCritic | Pre-Lab Engineering",
  description: publication?.metadata.description,
  alternates: {
    canonical: "/lab/autocritic/",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: publication
    ? {
        type: "article",
        title: publication.metadata.title,
        description: publication.metadata.description,
        images: ["/images/lab/openclaw-lab-og.png"],
      }
    : undefined,
};

export default function AutoCriticCompatibilityPage() {
  if (!publication) {
    notFound();
  }

  return (
    <div className="portfolio-shell">
      <Navigation />
      <LabPublicationArticle publication={publication} />
      <Footer />
    </div>
  );
}
