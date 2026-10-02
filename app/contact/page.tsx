import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { profile } from "../data/portfolio";

export const metadata: Metadata = {
  title: "Contact Luke Payne",
  description: "Get in touch with Luke Payne about AI and full-stack engineering work.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return <div className="portfolio-shell"><Navigation />
    <main id="main-content" className="portfolio-content container py-8 md:py-12">
      <h1 className="border-t-2 border-[var(--ink)] pt-5 text-4xl font-bold uppercase">Get in touch</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8">Available for AI and full-stack engineering work.</p>
      <p className="mt-3 text-sm text-[var(--muted)]">{profile.location}</p>
      <div className="my-8 flex flex-wrap gap-3"><a href={`mailto:${profile.email}`} className="mono-button primary">Email {profile.email}</a><a href={profile.linkedin} className="mono-button">LinkedIn -&gt;</a><Link href="/resume" className="mono-button">View resume</Link></div>
      <p className="mb-8 text-sm leading-7 text-[var(--muted)]">Have a question about a project? Include its name or link so I can follow the context.</p>
    </main><Footer /></div>;
}
