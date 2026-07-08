"use client";

import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="portfolio-content mt-10 border-t-2 border-[var(--ink)]">
      <div className="container flex flex-col gap-4 py-8 text-xs font-medium uppercase text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <span>Copyright {new Date().getFullYear()} Luke Payne</span>
        <span className="flex flex-wrap gap-5">
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--accent)]">
            Email
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
            GitHub -&gt;
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]">
            LinkedIn -&gt;
          </a>
        </span>
        <span>{profile.location} / Built with Next.js</span>
      </div>
    </footer>
  );
}
