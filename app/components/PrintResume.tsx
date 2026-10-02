"use client";

export default function PrintResume() {
  return <button type="button" onClick={() => window.print()} className="mono-button print-control">Print / save as PDF</button>;
}
