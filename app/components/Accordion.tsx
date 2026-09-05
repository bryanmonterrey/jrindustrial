"use client";

import { useState } from "react";

// Transitions.dev "Accordion expand" (globals.css: .t-acc*): the panel
// animates through grid-template-rows 0fr ↔ 1fr, so no height measuring,
// and the chevron flips from a "v" to a "^" through a flat line. One item
// open at a time; clicking the open question closes it.
export default function Accordion({ items, className = "" }: { items: { q: string; a: string }[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={`divide-y divide-ink/10 border-y border-ink/10 ${className}`}>
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className="t-acc" data-open={on ? "true" : "false"}>
            <button
              type="button"
              className="t-acc-head flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-start text-[15px] font-medium"
              aria-expanded={on}
              onClick={() => setOpen(on ? null : i)}
            >
              {f.q}
              <span className="t-acc-chevron shrink-0 text-ink/50">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6.5L8 10.5L12 6.5" />
                </svg>
              </span>
            </button>
            <div className="t-acc-panel">
              <div className="t-acc-panel-inner">
                <p className="max-w-prose pb-5 text-[14px] leading-relaxed text-ink/60">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
