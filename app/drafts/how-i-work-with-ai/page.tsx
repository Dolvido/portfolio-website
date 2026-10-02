import type { Metadata } from "next";
import ArticleChrome, { ArticleSection } from "../../components/ArticleChrome";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import SiteLink from "../../components/SiteLink";
import PublicationVisual from "../../components/PublicationVisual";

export const metadata: Metadata = {
  title: "How to finish projects with dot: notes from an early adopter | Draft",
  description: "An early adopter’s field notes on defining done, setting useful rules, reviewing artifacts and handling the rough edges. A living guide, grounded in what actually gets finished.",
  robots: { index: false, follow: false },
};

export default function DotFieldGuide() {
  return <div className="portfolio-shell"><Navigation />
    <ArticleChrome
      backHref="/lab/" backLabel="Back to writing"
      eyebrow="Early-adopter field notes / Local draft / Review pending"
      title="How to finish projects with dot"
      subtitle="An early adopter’s field notes on defining done, setting useful rules, reviewing artifacts and handling the rough edges. A living guide, grounded in what actually gets finished."
      contents={[
        { href: "#explore", label: "Explore aloud, then bound the task" },
        { href: "#review", label: "Review the thing, not the promise" },
        { href: "#scope", label: "Set rules and repeat useful routines" },
        { href: "#evidence", label: "Keep judgment and evidence together" },
      ]}
    >
      <p className="border-l-2 border-[var(--orange)] pl-4 text-sm leading-7 text-[var(--muted)]">Draft for review. This article has not been approved for publication.</p>
      <aside className="my-7 border-y border-[var(--line)] py-5 text-sm leading-7 text-[var(--muted)]" aria-label="Living article revision note">
        <p className="eyebrow">Living field notes / Last updated <time dateTime="2026-10-02">October 2, 2026</time></p>
        <p className="mt-3">These are notes from learning to work with dot, not a claim to have found the one right method. Their value should grow as projects genuinely finish and I can revisit which strategies helped. For now, I separate useful experience from ideas still to test.</p>
        <p className="mt-3"><strong>Revision note:</strong> Reframed this draft around finishing projects, with example rules, suggested routines and two explanatory diagrams. Private configuration and detailed internal plans remain outside the article.</p>
      </aside>
      <ArticleSection id="explore" label="01 / Start with a question" title="Explore aloud, then bound the task">
        <p>Getting more out of dot, for me, means getting closer to a finish line I can recognize. I often think aloud before I know the shape of the answer. Voice helps me follow an idea, correct a term or change the emphasis. Then I need to turn that exploration into a specific piece of work.</p>
        <p>The important transition is from exploration to an outcome. For this portfolio, “make it more like who I am now” was a useful opening, but it was not enough to judge the result. The clearer task was to give my current experimental work distinct stories, show the evidence and limitations, and bring back a local page I could inspect.</p>
        <p>I try to define done before the next build. What should exist at the end? What should be preserved? What evidence will I review? A working local page was a finish line for one milestone; publication was a separate decision. I bring the goal and make the architectural and acceptance decisions. Dot assists with implementation, investigation and testing.</p>
        <PublicationVisual block={{
          type: "diagram", layout: "flow", title: "Give the work a finish line",
          caption: "A conceptual map of how I direct work with dot, not a claim of autonomous delivery. Review can send the work back to an earlier step.",
          groups: [{ title: "From intent to something I can inspect", items: [
            { label: "Human direction", title: "Define done", text: "Name the deliverable, scope and review point.", tone: "neutral" },
            { label: "AI assistance", title: "Build within bounds", text: "Implement, investigate and test a defined piece.", tone: "recorded" },
            { label: "Inspectable artifact", title: "Bring back evidence", text: "A preview, a diff or a test record.", tone: "recorded" },
            { label: "Human judgment", title: "Review and adjust", text: "Accept it, change direction or ask another question.", tone: "neutral" },
          ] }],
        }} />
      </ArticleSection>
      <ArticleSection id="review" label="02 / Ask for something concrete" title="Review the thing, not the promise">
        <p>My most useful feedback usually comes after I can see something. I ask for a working preview, a code diff, a diagram or test evidence. A confident update can help me follow the work, but I need an artifact before I can decide whether it is moving in the right direction.</p>
        <p>The first portfolio direction made the projects look too similar. I pushed back on the generic architecture copy and asked for distinct flagship stories. OpenClaw needed room for its recovery question and unfinished integration. BiC needed visible successes and failures. The Tool Calling Lab needed its negative comparison result to stay readable. Seeing the page made those priorities easier to express.</p>
        <p>That gave me a practical way to steer dot: point to the thing that feels wrong, explain the decision it should help a reader make, and ask for a revised artifact. I did not need to specify every visual detail. I did need to recognize when an attractive layout was flattening the substance of the work.</p>
        <PublicationVisual block={{
          type: "diagram", layout: "comparison", title: "A hierarchy I could review",
          caption: "Schematic of the actual portfolio design iteration, not before-and-after screenshots. The change gives each current project a distinct story while retaining earlier work.",
          groups: [
            { title: "First direction / too much looked alike", items: [
              { label: "Similar visual weight", title: "A row of project cards", text: "The substantial experiments were harder to distinguish at a glance.", tone: "neutral" },
            ] },
            { title: "Revised direction / three deeper stories", items: [
              { label: "Flagship", title: "OpenClaw", text: "Interruption, recovery and acceptance boundaries.", tone: "recorded" },
              { label: "Flagship", title: "BiC", text: "Recorded learner replies, including failed composition.", tone: "recorded" },
              { label: "Released experiment", title: "Tool Calling Lab", text: "A useful model fit and an unreliable answer.", tone: "recorded" },
            ] },
          ],
        }} />
      </ArticleSection>
      <ArticleSection id="scope" label="03 / Make the habits repeatable" title="Set rules and repeat useful routines">
        <p>I would start with a few plain-language rules like these. They are examples a reader can adapt, not an export of my private configuration:</p>
        <ul className="list-disc space-y-3 pl-5">
          <li>State the bounded deliverable and what counts as done before starting.</li>
          <li>Report progress with an artifact or test evidence. If blocked, name the missing thing and what can still be finished.</li>
          <li>Preserve existing work and pause at the agreed review boundary before publishing or changing the target environment.</li>
        </ul>
        <p>The routines worth enabling are simple: a kickoff that checks scope, a review when a usable artifact exists, and a closeout that separates completed work from blockers and the next decision. For longer projects, I would add a regular check-in against the finish line. These are suggested working routines, not claims that an automated schedule is already enabled.</p>
        <p>Multitasking can also be a way to capture thoughts. When tasks come to mind, I want to assign them clearly and let dot organize the execution: sequence dependencies and work on independent pieces in parallel where that is appropriate. I still steer priorities and review the results. An idea I mention while thinking aloud is not automatically permission to act on it.</p>
        <p>Model selection and computer targeting need to be explicit, too. I match the depth of investigation to the question and distinguish requested settings from verified ones. When more than one computer is involved, I name the intended environment. More capable tools do not replace tests, and a preview on one computer is not automatically available from another.</p>
        <p>There are rough edges. During this refresh I returned to a preview that was no longer running. Restarting the existing server and checking the page restored the review. I want that kind of blocker reported concretely, so I can make the missing decision or restore access, rather than confuse more activity with progress toward done.</p>
      </ArticleSection>
      <ArticleSection id="evidence" label="04 / Keep the claims honest" title="Keep judgment and evidence together">
        <p>The same habit matters in my public projects. The released <SiteLink href="/projects/llm-tool-calling-lab/">Tool Calling Lab</SiteLink> reports a bounded experiment with limitations. The <SiteLink href="/projects/openclaw-evolutionary-lab/">evolutionary coding lab</SiteLink> is further from its intended outcome: its offline scaffold tests parts of a repeatable loop, but does not yet demonstrate a model autonomously improving code. A fixture testing the machinery is not evidence that a model made a useful decision.</p>
        <p>Fixed tests give a change something consistent to push against. Human review asks whether passing those tests answers the right question. I want both, with my contribution visible and unsupported conclusions left open. As more projects finish, I want to update these notes with what actually helped, what failed and what I would repeat. A future outcome is not evidence yet.</p>
      </ArticleSection>
    </ArticleChrome><Footer />
  </div>;
}
