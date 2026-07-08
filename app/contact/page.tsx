"use client";

import { FormEvent, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { profile } from "../data/portfolio";

export default function Contact() {
  const [sentName, setSentName] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    setSentName(name || "there");
    event.currentTarget.reset();
  }

  return (
    <div className="portfolio-shell">
      <Navigation />

      <main className="portfolio-content container">
        <section data-screen-label="Contact" className="py-12 md:py-16">
          <div className="border-t-2 border-[var(--ink)] pt-5">
            <h1 className="text-4xl font-bold uppercase md:text-5xl">Contact</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)]">
              Open to AI and full-stack engineering roles, freelance, and collaboration. The fastest way to reach me is email,
              or send a note below.
            </p>
          </div>

          <div className="mt-12 grid border border-[var(--ink)] lg:grid-cols-2">
            <div className="border-b border-[var(--ink)] p-6 lg:border-b-0 lg:border-r lg:p-9">
              <div className="mb-6 text-xs font-semibold uppercase text-[var(--faint)]">Coordinates</div>
              <div className="text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex flex-col gap-1 border-t border-[var(--dot-rule)] py-4 transition-colors hover:text-[var(--accent)] sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="uppercase text-[var(--muted)]">Email</span>
                  <span>{profile.email} -&gt;</span>
                </a>
                <a
                  href={profile.phoneHref}
                  className="flex flex-col gap-1 border-t border-[var(--dot-rule)] py-4 transition-colors hover:text-[var(--accent)] sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="uppercase text-[var(--muted)]">Phone</span>
                  <span>{profile.phone}</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 border-t border-[var(--dot-rule)] py-4 transition-colors hover:text-[var(--accent)] sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="uppercase text-[var(--muted)]">LinkedIn</span>
                  <span>{profile.linkedinLabel} -&gt;</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 border-t border-[var(--dot-rule)] py-4 transition-colors hover:text-[var(--accent)] sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="uppercase text-[var(--muted)]">GitHub</span>
                  <span>{profile.githubLabel} -&gt;</span>
                </a>
                <div className="flex flex-col gap-1 border-t border-[var(--dot-rule)] py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="uppercase text-[var(--muted)]">Location</span>
                  <span>{profile.location}</span>
                </div>
                <div className="flex flex-col gap-1 border-y border-[var(--dot-rule)] py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="uppercase text-[var(--muted)]">Status</span>
                  <span className="text-[var(--accent)]">{profile.status}</span>
                </div>
              </div>
            </div>

            <div className="p-6 lg:p-9">
              <div className="mb-6 text-xs font-semibold uppercase text-[var(--faint)]">Send a message</div>

              {sentName ? (
                <div className="border border-dashed border-[var(--accent)] p-7 text-center">
                  <div className="mb-3 text-sm font-semibold uppercase text-[var(--accent)]">Message sent</div>
                  <p className="text-sm leading-7 text-[var(--muted)]">Thanks, {sentName}. I&apos;ll get back to you shortly.</p>
                  <button type="button" onClick={() => setSentName("")} className="mono-button mt-5">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <label className="mb-2 block text-xs font-semibold uppercase text-[var(--muted)]" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="mb-6 w-full border-0 border-b border-[var(--ink)] bg-transparent px-0 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                  />

                  <label className="mb-2 block text-xs font-semibold uppercase text-[var(--muted)]" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="mb-6 w-full border-0 border-b border-[var(--ink)] bg-transparent px-0 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                  />

                  <label className="mb-2 block text-xs font-semibold uppercase text-[var(--muted)]" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What are you building?"
                    className="mb-7 w-full resize-y border-0 border-b border-[var(--ink)] bg-transparent px-0 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent)]"
                  />

                  <button type="submit" className="mono-button primary w-full">
                    Transmit -&gt;
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
