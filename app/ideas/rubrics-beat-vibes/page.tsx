import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";

const rubricChecks = [
  {
    title: "Task Fit",
    body: "Does the answer solve the actual request, or only sound adjacent to it? Good evaluation starts by naming the job the output was supposed to do.",
  },
  {
    title: "Grounding",
    body: "Which claims are supported by context, retrieved evidence, tool output, or known constraints? Ungrounded confidence is one of the easiest LLM failure modes to miss in casual review.",
  },
  {
    title: "Completeness",
    body: "A response can be fluent and still omit the step, caveat, citation, test, or handoff that makes it useful. Rubrics force reviewers to check what is absent.",
  },
  {
    title: "Actionability",
    body: "Useful output tells the next person what to do, what changed, what is uncertain, and what should be verified. Style is secondary to operational clarity.",
  },
  {
    title: "Risk Handling",
    body: "High-impact domains need explicit checks for overreach, unsafe instructions, private data exposure, and misplaced certainty. Risk should be scored deliberately, not noticed accidentally.",
  },
];

export default function RubricsBeatVibes() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/ideas"
        backLabel="Back to ideas"
        eyebrow="EVAL-001 / Practice / Evaluation"
        title="Rubrics Beat Vibes: Evaluating LLM Output"
        subtitle="A short note on why LLM evaluation should be structured, repeatable, and boring enough to trust."
        quote="If an evaluation cannot be repeated by another reviewer, it is probably a reaction, not a measurement."
      >
        <ArticleSection label="00 / Premise" title="Fluency Is Not Quality">
          <p>
            LLM output is easy to like when it is confident, polished, and fast. That is exactly why informal evaluation
            is dangerous. A model can sound helpful while missing a requirement, inventing a source, ignoring a risk, or
            producing an answer that cannot be used.
          </p>
          <p>
            Rubrics make review slower in the right way. They turn subjective reactions into repeatable checks that can
            be compared across models, prompts, product changes, and human reviewers.
          </p>
        </ArticleSection>

        <ArticleSection label="01 / Checks" title="A Small Evaluation Rubric">
          <div className="border-b-2 border-[var(--ink)]">
            {rubricChecks.map((check, index) => (
              <NumberedPanel key={check.title} number={String(index + 1).padStart(2, "0")} title={check.title}>
                <p>{check.body}</p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="02 / Workflow" title="Evaluation Should Produce Evidence">
          <p>
            A useful evaluation workflow stores examples, reviewer notes, expected behavior, scored dimensions, and model
            or prompt versions. That evidence lets a team answer practical questions: did the new prompt improve factual
            grounding, did it reduce refusals, did it make answers too verbose, and did reviewers agree?
          </p>
          <p>
            The boring parts matter. Clear scoring labels, representative test sets, disagreement review, and regression
            checks are what keep evaluation from becoming a mood board.
          </p>
        </ArticleSection>

        <ArticleSection label="03 / Standard" title="A Practical Bar">
          <ul className="list-disc space-y-2 pl-5">
            <li>Define success before comparing outputs.</li>
            <li>Use the same examples across model and prompt changes.</li>
            <li>Separate correctness, completeness, tone, and risk into different scores.</li>
            <li>Keep reviewer notes so failures can be categorized and fixed.</li>
          </ul>
        </ArticleSection>

        <ArticleSection label="04 / Conclusion" title="Trust Comes From Repetition">
          <p>
            Strong LLM evaluation is not glamorous. It is structured, repeatable, and clear enough that another person can
            inspect the same output and understand the score. That is the point.
          </p>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
