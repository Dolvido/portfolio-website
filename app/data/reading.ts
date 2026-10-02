export type ReadingLink = { href: string; title: string; description: string };

// Editorial connections describe shared questions, not an inferred project lineage.
const connections: Record<string, ReadingLink[]> = {
  "/projects/llm-tool-calling-lab": [
    { href: "/lab/llm-tool-calling-lab-first-release", title: "Experiment findings and app walkthrough", description: "See the local app, the failed comparisons, and the decisions behind the first release." },
    { href: "/ideas/rubrics-beat-vibes", title: "Rubrics Beat Vibes", description: "The evaluation principles behind checking an answer separately from a successful tool call." },
  ],
  "/lab/llm-tool-calling-lab-first-release": [
    { href: "/projects/llm-tool-calling-lab", title: "LLM Tool Calling Lab case study", description: "A shorter overview of the implementation, comparison, and inspectable evidence." },
    { href: "/ideas/rubrics-beat-vibes", title: "Rubrics Beat Vibes", description: "Compare the evaluation principles with this release's rubric and acknowledged review limits." },
  ],
  "/ideas/rubrics-beat-vibes": [
    { href: "/projects/llm-tool-calling-lab", title: "LLM Tool Calling Lab case study", description: "A concrete evaluation with recorded failures; its unblinded AI reviews remain a limitation." },
    { href: "/lab/llm-tool-calling-lab-first-release", title: "What the first release changed", description: "How a successful model fit can still lead to an unreliable answer." },
    { href: "/projects/bic", title: "Brain in Computer", description: "A different evaluation problem: separating practiced instruction learning from unfamiliar composition." },
  ],
  "/projects/bic": [
    { href: "/ideas/rubrics-beat-vibes", title: "Rubrics Beat Vibes", description: "Why each claimed capability needs its own explicit, repeatable check." },
  ],
  "/ideas/agents-need-flight-recorders": [
    { href: "/lab/openclaw-cancellation-and-recovery", title: "Stopping work and preserving its outcome", description: "The OpenClaw series examines saved outcomes and recovery, including what remains unfinished." },
    { href: "/projects/autopycode", title: "AutoPyCode case study", description: "How patches, test results, and run records make a coding attempt reviewable." },
  ],
  "/projects/autopycode": [
    { href: "/ideas/agents-need-flight-recorders", title: "Agents Need Flight Recorders", description: "Why the record of a coding attempt matters as much as its final patch." },
  ],
  "/lab/openclaw-cancellation-and-recovery": [
    { href: "/ideas/agents-need-flight-recorders", title: "Agents Need Flight Recorders", description: "The broader engineering argument for preserving decisions and outcomes." },
  ],
  "/projects/autoagent": [
    { href: "/lab/autocritic", title: "AutoCritic: another local code-review approach", description: "Compare the documented interfaces and review workflows. This is a thematic connection, not a claim of shared implementation." },
    { href: "/ideas/poisoned-context-supply-chain-risk", title: "Poisoned Context Is the New Supply Chain Risk", description: "A related design concern when retrieved examples influence generated reviews; no security evaluation is claimed here." },
  ],
  "/lab/autocritic": [
    { href: "/projects/autoagent", title: "AutoAgent case study", description: "Another local code-review project, with structured findings and visible retrieval failures. Compare the approaches without assuming shared implementation." },
  ],
  "/ideas/poisoned-context-supply-chain-risk": [
    { href: "/projects/autoagent", title: "AutoAgent case study", description: "A retrieval-assisted review workflow where these design questions are relevant; this connection does not establish tested injection defenses." },
  ],
  "/ideas/nanotech-safety": [
    { href: "/ideas/unconscious-nanodrone-swarm", title: "A speculative nanodrone scenario", description: "The companion thought experiment explores why replication would need explicit limits. Neither article reports a built nanosystem." },
  ],
  "/ideas/unconscious-nanodrone-swarm": [
    { href: "/ideas/nanotech-safety", title: "Nanotech Safety Blueprint", description: "The companion conceptual safety principles; these are speculative proposals, not demonstrated controls." },
  ],
};

export function getRelatedReading(path: string): ReadingLink[] {
  return connections[path.replace(/\/$/, "")] ?? [];
}
