import Footer from "../../components/Footer";
import Navigation from "../../components/Navigation";
import ArticleChrome, { ArticleSection, NumberedPanel } from "../../components/ArticleChrome";

const principles = [
  {
    title: "Safety-by-Design from Day Zero",
    body: "All nanosystems must be conceptualized with failure modes mapped before functional prototypes are constructed. Containment, shutdown, and recovery should precede any replication or autonomous features.",
  },
  {
    title: "Multi-Layered Containment and Redundancy",
    body: "Self-replicating or self-organizing nanosystems should operate inside physical, environmental, and chemical containment regimes. No system should rely on a single point of failure.",
  },
  {
    title: "Proven Kill Switches Before Deployment",
    body: "No nanobot or swarm should enter physical operation without independent self-destruction pathways, environmental kill triggers, and external manual overrides.",
  },
  {
    title: "Simulation-First, Hardware-Last",
    body: "Full population-scale simulations and stress tests should run before physical construction, including environmental drift, error propagation, resource hijacking, and emergent behavior.",
  },
  {
    title: "Restricted Replication Parameters",
    body: "Replication-enabled systems should include copy limits, lifespan limits, material quotas, geofenced boundaries, and decay protocols after a mission is complete.",
  },
  {
    title: "Real-Time Population and Behavior Monitoring",
    body: "Live particle tracking, chemical emission monitoring, and thermal anomaly detection should be active during all operations, with AI-assisted warnings for deviation patterns.",
  },
  {
    title: "External Ethical and Safety Governance",
    body: "Independent ethics and safety boards should certify self-replicating nanosystem projects before activation, with clear kill criteria and emergency shutdown authority.",
  },
  {
    title: "Slow Capability Rollouts",
    body: "Enhanced replication rates, adaptive behaviors, and environmental interaction should be introduced incrementally through staged, supervised deployments.",
  },
];

const biologicalPatterns = [
  {
    title: "Immune System Recognition",
    body: "Self/non-self recognition can inform nanobot identification protocols, including cryptographic signatures for authorized peers and neutralization of unauthorized replicators.",
  },
  {
    title: "Programmed Cell Death",
    body: "Apoptosis suggests deterministic lifespans and programmed disassembly pathways triggered by timers, error detection, or environmental signals.",
  },
  {
    title: "Cell Division Checkpoints",
    body: "Replication should require multiple verification steps, including resource availability, environmental suitability, and system integrity checks.",
  },
  {
    title: "Homeostatic Regulation",
    body: "Density-dependent regulation can reduce replication rates or increase deactivation when populations grow too dense.",
  },
];

export default function NanotechSafety() {
  return (
    <div className="portfolio-shell">
      <Navigation />

      <ArticleChrome
        backHref="/ideas"
        backLabel="Back to ideas"
        eyebrow="NTE-001 / Blueprint / Safety"
        title="Nanotech Safety Blueprint"
        subtitle="Principles for responsible molecular engineering and self-replicating nanomachine development."
        quote="Responsible engineering must precede transformative innovation. Before we dream of what nanotech can do, we must first define what it will never do."
      >
        <ArticleSection label="00 / Premise" title="Safety Before Capability">
          <p>
            As AI and nanotechnology converge, safe system design becomes increasingly important. This blueprint extends
            AI safety thinking to self-replicating nanomachines through preventative frameworks and multi-layered controls.
          </p>
        </ArticleSection>

        <ArticleSection label="01 / Principles" title="Operating Principles">
          <div className="border-b-2 border-[var(--ink)]">
            {principles.map((principle, index) => (
              <NumberedPanel key={principle.title} number={String(index + 1).padStart(2, "0")} title={principle.title}>
                <p>{principle.body}</p>
              </NumberedPanel>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="02 / Bio Patterns" title="Biological Inspirations">
          <p>
            Nature has already developed mechanisms for controlling replication and maintaining safety at the molecular
            level. These patterns are useful design references, but engineered systems must exceed biology in reliability.
          </p>
          <div className="grid border border-[var(--ink)] md:grid-cols-2">
            {biologicalPatterns.map((pattern, index) => (
              <div
                key={pattern.title}
                className={`p-5 ${index % 2 === 0 ? "md:border-r" : ""} ${
                  index < 2 ? "border-b" : ""
                } border-[var(--rule)]`}
              >
                <h3 className="text-sm font-bold text-[var(--ink)]">{pattern.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{pattern.body}</p>
              </div>
            ))}
          </div>
        </ArticleSection>

        <ArticleSection label="03 / Reliability" title="From Bio-Inspired to Bio-Secured">
          <ul className="list-disc space-y-2 pl-5">
            <li>Use orthogonal safety mechanisms that operate through independent pathways.</li>
            <li>Include environmental sensing that exceeds biological capabilities.</li>
            <li>Coordinate swarm-level response protocols when local anomalies appear.</li>
            <li>Adapt safety protocols based on observed edge cases without relaxing hard constraints.</li>
          </ul>
        </ArticleSection>

        <ArticleSection label="04 / Conclusion" title="Control Is the Foundation">
          <p>
            The potential of nanotechnology lies not only in its power to build, but in our wisdom to control it. Safety
            is not a limitation; it is the foundation for trusted, world-changing innovation.
          </p>
        </ArticleSection>
      </ArticleChrome>

      <Footer />
    </div>
  );
}
