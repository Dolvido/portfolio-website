import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";

const recorderLayers = [
  {
    title: "Structured Event Logs",
    body: "Record the meaningful steps: user request, retrieved context, tool call, tool result, model response, state mutation, and handoff. A useful log makes the system legible without requiring someone to reconstruct behavior from screenshots or guesses.",
  },
  {
    title: "Traceable Runs",
    body: "Group work under stable correlation identifiers so failures can be followed across services. Agent behavior often crosses UI, API, queue, model, database, and tool boundaries; the trace has to cross them too.",
  },
  {
    title: "Replayable Decisions",
    body: "Keep enough input, configuration, model metadata, and tool output to reproduce what the system saw. Replay is how surprising behavior becomes an engineering problem instead of a debate about what probably happened.",
  },
  {
    title: "Human-Readable Decision Trails",
    body: "Summaries, status labels, and confidence signals should explain the agent's state in plain language. Raw traces are for debugging; decision trails are for review, escalation, and accountability.",
  },
  {
    title: "Explicit Stop Points",
    body: "High-impact actions should leave checkpoints where a person can pause, reject, or approve the next step. Autonomy is easier to trust when the system knows where not to continue alone.",
  },
];

export default function AgentsNeedFlightRecorders() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/ideas"
        backLabel="Back to ideas"
        eyebrow="OBS-001 / Systems / Observability"
        title="Agents Need Flight Recorders"
        subtitle="Why autonomous systems need logs, traces, replay, and human-readable decision trails before they need more autonomy."
        quote="Before an agent can be trusted to act, it has to be possible to understand what it did, what it saw, and why it kept going."
      >
        <ArticleSection label="00 / Premise" title="Autonomy Without Evidence Is Fragile">
          <p>
            A software agent is not only a model response. It is a chain of inputs, retrieval steps, tool calls, policy
            decisions, state changes, and user-facing output. When that chain fails, the responsible question is not just
            whether the final answer was wrong. The question is where the system lost the plot.
          </p>
          <p>
            That makes observability part of the safety system. Logs, traces, replay, and review trails are the
            difference between an agent that feels impressive in a demo and one that can survive production use.
          </p>
        </ArticleSection>

        <ArticleSection label="01 / Recorder" title="What the Flight Recorder Captures">
          <div className="border-b-2 border-[var(--ink)]">
            {recorderLayers.map((layer, index) => (
              <NumberedPanel key={layer.title} number={String(index + 1).padStart(2, "0")} title={layer.title}>
                <p>{layer.body}</p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="02 / Review" title="Responsible Autonomy Is Reviewable">
          <p>
            Reviewability changes the engineering culture around agents. Bugs stop being mysterious one-off transcripts.
            Product decisions become traceable. Security reviews can inspect which context entered the prompt. Evaluation
            work can compare runs instead of only collecting reactions.
          </p>
          <p>
            The goal is not to drown every workflow in telemetry. The goal is to capture the minimum durable evidence
            needed to debug, replay, explain, and improve important behavior.
          </p>
        </ArticleSection>

        <ArticleSection label="03 / Standard" title="A Practical Bar">
          <ul className="list-disc space-y-2 pl-5">
            <li>Every run should have a stable identifier that follows it across services.</li>
            <li>Every tool call should record its input boundary, output boundary, and error state.</li>
            <li>Every committed state change should be attributable to a request, run, and actor.</li>
            <li>Every high-impact action should support replay, review, or human approval.</li>
          </ul>
        </ArticleSection>

        <ArticleSection label="04 / Conclusion" title="More Visibility Before More Power">
          <p>
            Agent capability is moving quickly. The engineering discipline around agents should move just as quickly.
            Better autonomy should start with better evidence.
          </p>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
