import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";

const contextRisks = [
  {
    title: "Web and Search Results",
    body: "Agents that browse or retrieve from public pages can ingest hostile instructions, misleading snippets, hidden text, or planted examples. Search is not neutral context just because it arrived through a tool.",
  },
  {
    title: "Repository Content",
    body: "README files, issues, comments, tests, generated artifacts, and dependency docs can all become prompt input. Treating every repo file as trusted context gives attackers a new place to hide instructions.",
  },
  {
    title: "Tickets and Internal Docs",
    body: "Work management systems contain user language, pasted logs, markdown, links, and attachments. Once an agent reads them, normal collaboration surfaces become part of the execution environment.",
  },
  {
    title: "Tool Output",
    body: "Tool responses should be data, not authority. A model must not blindly follow instructions embedded in command output, API payloads, scraped pages, or retrieved documents.",
  },
  {
    title: "Evaluation Sets",
    body: "If test examples are poisoned, the evaluation can reward the wrong behavior. The same context hygiene used for production should apply to examples used to steer models and prompts.",
  },
];

export default function PoisonedContextSupplyChainRisk() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/ideas"
        backLabel="Back to ideas"
        eyebrow="SEC-001 / Safety / Security"
        title="Poisoned Context Is the New Supply Chain Risk"
        subtitle="As models read from the web, repos, docs, and tickets, prompt injection and data poisoning become engineering problems, not just security trivia."
        quote="When context becomes executable influence, context deserves the same suspicion we already apply to dependencies, secrets, and build steps."
      >
        <ArticleSection label="00 / Premise" title="Context Is Now an Attack Surface">
          <p>
            Modern AI systems do not only answer prompts typed by users. They read web pages, repository files, tickets,
            documentation, chat history, database rows, logs, and tool output. Every one of those sources can shape model
            behavior.
          </p>
          <p>
            That shifts prompt injection and data poisoning from novelty demos into software supply chain concerns. The
            risk is not that text becomes magic code. The risk is that text quietly changes what an autonomous system
            believes it should do.
          </p>
        </ArticleSection>

        <ArticleSection label="01 / Surfaces" title="Where Poisoned Context Enters">
          <div className="border-b-2 border-[var(--ink)]">
            {contextRisks.map((risk, index) => (
              <NumberedPanel key={risk.title} number={String(index + 1).padStart(2, "0")} title={risk.title}>
                <p>{risk.body}</p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="02 / Controls" title="Engineering Controls">
          <p>
            The practical response is context hygiene. Systems should label source trust, separate instructions from
            retrieved data, quote untrusted text instead of executing it as policy, and require confirmation before
            high-impact actions. Retrieval and tool layers should preserve provenance so reviewers can see where a claim
            or instruction entered the workflow.
          </p>
          <p>
            Good controls also limit blast radius. A model that reads a ticket should not automatically gain permission
            to exfiltrate secrets, modify production state, or override system rules because the ticket asked nicely.
          </p>
        </ArticleSection>

        <ArticleSection label="03 / Standard" title="A Practical Bar">
          <ul className="list-disc space-y-2 pl-5">
            <li>Classify context by source and trust level before injecting it into model calls.</li>
            <li>Keep system and developer instructions separate from retrieved or user-controlled text.</li>
            <li>Preserve provenance for documents, snippets, tool outputs, and generated summaries.</li>
            <li>Gate destructive or sensitive actions behind explicit policy and human approval.</li>
          </ul>
        </ArticleSection>

        <ArticleSection label="04 / Conclusion" title="Treat Context Like a Dependency">
          <p>
            AI safety and application security meet at the context boundary. If a system depends on outside text to
            decide what to do, that text needs source tracking, trust boundaries, and reviewable controls.
          </p>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
