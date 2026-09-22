// Regenerate with: node scripts/generate-openclaw-progress-diagrams.mjs
// The publication contract uses raster figures; keep their editable source here.
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const outputDirectory = fileURLToPath(
  new URL("../public/images/lab/openclaw-engine-progress/", import.meta.url),
);
const colors = {
  paper: "#f2efe7",
  card: "#faf8f2",
  ink: "#1b1a16",
  muted: "#625e53",
  rule: "#cfcabd",
  blue: "#2f5fd0",
  green: "#28624b",
  amber: "#8b581a",
};
const escape = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const text = (x, y, value, size = 30, fill = colors.ink, weight = 400) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}">${escape(value)}</text>`;
const rect = (x, y, width, height, fill = colors.card, stroke = colors.rule) =>
  `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const line = (x1, y1, x2, y2, stroke = colors.rule, extra = "") =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="3" ${extra}/>`;

function svg(height, title, contents) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${height}" viewBox="0 0 900 ${height}">
    <title>${escape(title)}</title>
    <defs>
      <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="${colors.ink}" stroke-opacity="0.035"/>
      </pattern>
      <marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
        <path d="M 2 2 L 10 6 L 2 10" fill="none" stroke="${colors.blue}" stroke-width="2"/>
      </marker>
    </defs>
    <rect width="900" height="${height}" fill="${colors.paper}"/>
    <rect width="900" height="${height}" fill="url(#grid)"/>
    <g font-family="Consolas, 'Liberation Mono', monospace">
      ${text(48, 49, "OPENCLAW EVOLUTIONARY CODING LAB", 21, colors.blue, 700)}
      ${contents}
    </g>
  </svg>`;
}

const steps = [
  ["Scope + authorize", "Pin the task, source, permissions", "and deadline."],
  ["Claim once", "Record the attempt before launch;", "reject a replay."],
  ["Run + evaluate", "Edit an isolated copy, run checks", "and enforce execution limits."],
  ["Return for review", "Collect the patch and test results.", "Preserve the original project."],
];
const workflow = svg(1180, "The intended coding workflow", `
  ${text(48, 108, "From a task", 46, colors.ink, 700)}
  ${text(48, 157, "to a reviewable change", 46, colors.ink, 700)}
  ${text(48, 202, "TARGET WORKFLOW", 23, colors.muted, 700)}
  ${steps.map(([title, first, second], index) => {
    const y = 232 + index * 214;
    return `${rect(48, y, 804, 164)}
      <circle cx="103" cy="${y + 48}" r="26" fill="${colors.blue}"/>
      ${text(94, y + 59, index + 1, 31, colors.card, 700)}
      ${text(150, y + 58, title, 36, colors.ink, 700)}
      ${text(150, y + 103, first, 30, colors.muted)}
      ${text(150, y + 141, second, 30, colors.muted)}
      ${index < steps.length - 1 ? line(450, y + 173, 450, y + 204, colors.blue, 'marker-end="url(#arrow)"') : ""}`;
  }).join("\n")}
  ${line(48, 1070, 852, 1070)}
  ${text(48, 1120, "INTEGRATION IN PROGRESS", 27, colors.blue, 700)}
  ${text(48, 1156, "Complete demonstration still pending.", 27, colors.muted)}
`);

const phases = [
  {
    label: "VERIFIED SNAPSHOT / SOURCE-V9",
    title: "Repeatable source + offline demo",
    lines: ["1,587 tests; one expected failure", "17 machine-specific checks excluded"],
    color: colors.green,
  },
  {
    label: "CURRENT DEVELOPMENT",
    title: "Cancellation + integration",
    lines: ["Focused cancellation checks passed.", "Complete workflow still pending."],
    color: colors.blue,
  },
  {
    label: "NEXT DEMONSTRATION",
    title: "One isolated coding task",
    lines: ["Success, failure, restart", "and cancellation."],
    color: colors.amber,
  },
];
const status = svg(1000, "Verified snapshot, current work and next demonstration", `
  ${text(48, 108, "Evidence now.", 46, colors.ink, 700)}
  ${text(48, 157, "Integration next.", 46, colors.ink, 700)}
  ${line(67, 252, 67, 472, colors.blue)}
  ${line(67, 472, 67, 692, colors.amber, 'stroke-dasharray="7 9"')}
  ${phases.map((phase, index) => {
    const y = 220 + index * 220;
    const marker = index === 0
      ? `<circle cx="67" cy="${y + 32}" r="19" fill="${phase.color}"/><path d="M57 ${y + 32} l7 7 l13 -14" fill="none" stroke="${colors.card}" stroke-width="4"/>`
      : `<circle cx="67" cy="${y + 32}" r="19" fill="${colors.paper}" stroke="${phase.color}" stroke-width="3"/>${index === 1 ? `<circle cx="67" cy="${y + 32}" r="8" fill="${phase.color}"/>` : ""}`;
    return `${rect(118, y, 734, 180)}
      ${marker}
      ${text(144, y + 35, phase.label, 22, phase.color, 700)}
      ${text(144, y + 86, phase.title, 33, colors.ink, 700)}
      ${text(144, y + 125, phase.lines[0], 29, colors.muted)}
      ${text(144, y + 162, phase.lines[1], 29, colors.muted)}`;
  }).join("\n")}
  ${line(48, 884, 852, 884)}
  ${text(48, 930, "LOCAL DEVELOPMENT EVIDENCE", 25, colors.muted, 700)}
  ${text(48, 970, "Production qualification remains open.", 27, colors.ink)}
`);

await fs.mkdir(outputDirectory, { recursive: true });
for (const [name, source, height] of [["workflow", workflow, 1180], ["status", status, 1000]]) {
  const output = `${outputDirectory}/${name}.png`;
  await sharp(Buffer.from(source), { density: 144 })
    .resize(1800, height * 2)
    .png({ compressionLevel: 9 })
    .toFile(output);
  console.log(`Generated ${name}.png (1800 x ${height * 2})`);
}
