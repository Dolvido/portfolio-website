import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import LabPublicationArticle from "../../components/LabPublicationArticle";
import Navigation from "../../components/Navigation";
import { getLabPublicationBySlug, getPublishedLabPublications } from "../../../lib/lab/publications";

type LabPublicationPageProps = {
  params: {
    slug: string;
  };
};

const labSocialImage = "/images/lab/openclaw-lab-og.png";

export function generateStaticParams() {
  return getPublishedLabPublications().map((publication) => ({ slug: publication.metadata.slug }));
}

export function generateMetadata({ params }: LabPublicationPageProps): Metadata {
  const publication = getLabPublicationBySlug(params.slug);

  if (!publication) {
    return {
      title: "Lab Publication | Luke Payne",
    };
  }

  const collectionName =
    publication.provenance.origin === "historical-migration" ? "Pre-Lab Engineering" : "OpenClaw Lab";

  return {
    title: `${publication.metadata.title} | ${collectionName}`,
    description: publication.metadata.description,
    alternates: {
      canonical: `/lab/${publication.metadata.slug}/`,
    },
    openGraph: {
      type: "article",
      title: publication.metadata.title,
      description: publication.metadata.description,
      authors: ["Luke Payne"],
      tags: publication.metadata.tags,
      images: [
        {
          url: labSocialImage,
          alt: "OpenClaw Lab by Luke Payne - human-directed, evidence-backed, locally operated",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: publication.metadata.title,
      description: publication.metadata.description,
      images: [labSocialImage],
    },
  };
}

export default function LabPublicationPage({ params }: LabPublicationPageProps) {
  const publication = getLabPublicationBySlug(params.slug);

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
