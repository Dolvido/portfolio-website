import type { PublicationBarChart, PublicationDiagram } from "../../lib/lab/types";

const formatBytes = (value: number) => `${value.toLocaleString("en-US")} bytes`;

export default function PublicationVisual({ block }: { block: PublicationDiagram | PublicationBarChart }) {
  return (
    <figure className="publication-visual" data-publication-visual={block.type}>
      <figcaption>
        <span className="visual-eyebrow">{block.type === "diagram" ? "System view" : "Measured comparison"}</span>
        <span className="visual-title">{block.title}</span>
        <span className="visual-caption">{block.caption}</span>
      </figcaption>

      {block.type === "diagram" ? (
        <div className={`visual-groups visual-${block.layout}`}>
          {block.groups.map((group, groupIndex) => (
            <div className="visual-group" key={groupIndex}>
              <div className="visual-group-title">{group.title}</div>
              <ol className="visual-steps">
                {group.items.map((item, index) => (
                  <li className={`visual-step visual-tone-${item.tone}`} key={index}>
                    <div className="visual-step-heading">
                      <span className="visual-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <span className="visual-step-label">{item.label}</span>
                    </div>
                    <div className="visual-step-title">{item.title}</div>
                    <div className="visual-step-text">{item.text}</div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      ) : (
        <div className="visual-chart">
          <div className="visual-chart-reference">
            <span aria-hidden="true" className="visual-reference-key" />
            {block.reference.label}: {formatBytes(block.reference.value)}
          </div>
          <div className="visual-chart-axis" aria-hidden="true">
            <span>0 MB</span><span>{block.maximum / 1_000_000} MB</span>
          </div>
          <dl className="visual-chart-rows">
            {block.items.map((item, index) => (
              <div className="visual-chart-row" key={index}>
                <dt>{item.label}</dt>
                <dd>
                  <div className="visual-bar-track" aria-hidden="true">
                    <div
                      className={`visual-bar ${item.value > block.reference.value ? "visual-bar-over" : ""}`}
                      style={{ width: `${(item.value / block.maximum) * 100}%` }}
                    />
                    <span className="visual-limit" style={{ left: `${(block.reference.value / block.maximum) * 100}%` }} />
                  </div>
                  <span className="visual-chart-value">{formatBytes(item.value)}</span>
                  <span className="visual-chart-note">{item.note}</span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="visual-chart-footnote">Shared scale starts at zero. 1 MB = 1,000,000 bytes.</div>
        </div>
      )}
    </figure>
  );
}
