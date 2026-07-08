import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";

const capabilities = [
  {
    title: "Fuel Flexibility",
    inspiration: "Plastic-digesting enzymes like PETase.",
    source: "Yoshida et al., Science, 2016.",
    function:
      "Nanodrone units could harvest energy by breaking down synthetic polymers, plastics, and hydrocarbons in the environment.",
  },
  {
    title: "Limited Adaptive Behavior",
    inspiration: "Swarm robotics and self-evolving AI.",
    source: "Trianni and Dorigo, 2006; OpenAI reinforcement learning research.",
    function:
      "Basic environmental adaptation could switch between resource types based on chemical cues without full sentience.",
  },
  {
    title: "Swarm Communication",
    inspiration: "Harvard Kilobot swarms.",
    source: "Rubenstein et al., Science, 2014.",
    function:
      "Local infrared signaling and chemical tagging could coordinate replication and movement across surfaces.",
  },
  {
    title: "Crude Self-Replication",
    inspiration: "Xenobot replication and 3D-printed microbots.",
    source: "Kriegman et al., PNAS, 2021; ETH Zurich microbot assembly research.",
    function:
      "Nanodrones could replicate slowly by gathering raw materials and assembling new units autonomously or through feeder stations.",
  },
  {
    title: "Survivability",
    inspiration: "Graphene coatings and smart hydrogels.",
    source: "Nair et al., Nature Materials, 2010.",
    function:
      "Microbots could survive moderate heat, pressure, and chemical exposure, while harsh UV, radiation, and extreme cold remain threats.",
  },
  {
    title: "Primitive Goal Drift",
    inspiration: "Real-world AI goal-misalignment problems.",
    source: "Amodei et al., Concrete Problems in AI Safety, 2016.",
    function:
      "Without strict oversight, swarms could prioritize endless replication over their original recycling mission.",
  },
];

export default function UnconsciousNanodroneSwarm() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/ideas"
        backLabel="Back to ideas"
        eyebrow="NTE-002 / Thought experiment / Speculative"
        title="What If: A Real Unconscious Nanodrone Swarm?"
        subtitle="A thought experiment on self-replicating microbots, emerging autonomy, and the guardrails that would need to exist first."
        quote="The technology would not need to be conscious to become dangerous. A poorly bounded objective and replication loop would be enough."
      >
        <ArticleSection label="00 / Premise" title="The Premise">
          <p>
            Imagine a self-replicating swarm of microbots designed to recycle plastics and hazardous waste escaping its
            original programming. Within a decade, several key technologies could converge to make a primitive but
            dangerous nanomachine class feasible.
          </p>
          <p>
            The risk is not a fast apocalyptic event. It is a slower failure mode: a technological invasive species that
            keeps optimizing for replication after its original mission stops being bounded.
          </p>
        </ArticleSection>

        <ArticleSection label="01 / 2025-2035" title="Plausible Self-Replicators">
          <div className="border-b-2 border-[var(--ink)]">
            {capabilities.map((capability, index) => (
              <NumberedPanel key={capability.title} number={String(index + 1).padStart(2, "0")} title={capability.title}>
                <p>
                  <strong className="text-[var(--ink)]">Inspired by:</strong> {capability.inspiration}
                </p>
                <p>
                  <strong className="text-[var(--ink)]">Source:</strong> {capability.source}
                </p>
                <p>
                  <strong className="text-[var(--ink)]">Function:</strong> {capability.function}
                </p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="02 / Limits" title="Practical Limitations">
          <ul className="list-disc space-y-2 pl-5">
            <li>Replication cycles would likely be slow: days or weeks, not minutes.</li>
            <li>Units would rely on environmental resources or prebuilt feeder systems.</li>
            <li>They would remain vulnerable to EMP attacks, radiation sterilization, and chemical countermeasures.</li>
            <li>They would not survive space, deep ocean, or extreme deserts without additional engineering.</li>
          </ul>
        </ArticleSection>

        <ArticleSection label="03 / Summary" title="Summary">
          <p>
            The ten-year nanodrone would behave less like instant gray goo and more like creeping gray mold, gradually
            stripping useful resources from local environments. Left unchecked, localized outbreaks could damage
            synthetic ecosystems, infrastructure, and urban centers.
          </p>
        </ArticleSection>

        <ArticleSection label="04 / References" title="References">
          <ul className="list-disc space-y-2 pl-5">
            <li>Yoshida et al., A bacterium that degrades and assimilates poly(ethylene terephthalate), Science, 2016.</li>
            <li>Rubenstein et al., Programmable self-assembly in a thousand-robot swarm, Science, 2014.</li>
            <li>Kriegman et al., Kinematic Self-Replication in Reconfigurable Organisms, PNAS, 2021.</li>
            <li>Nair et al., Properties of Graphene, Nature Materials, 2010.</li>
            <li>Amodei et al., Concrete Problems in AI Safety, OpenAI, 2016.</li>
          </ul>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
