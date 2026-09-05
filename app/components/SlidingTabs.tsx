"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// Transitions.dev "Tabs sliding", circular: a pill sits under the selected
// tab and slides/resizes to the next one on click (250 ms,
// cubic-bezier(0.22, 1, 0.36, 1)); labels sit above it. The pill's transform
// and width are written from the active tab's offsetLeft / offsetWidth, so
// the CSS transition tweens between measured positions. First paint and
// resizes write them with the transition suspended (transition: none, forced
// reflow, restore) so the pill snaps into place before anything can animate.
export type Tab<T extends string> = { id: T; label: ReactNode };

type SlidingTabsProps<T extends string> = {
  tabs: Tab<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Stretch across the container with equal cells; otherwise hug the labels. */
  full?: boolean;
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
};

export default function SlidingTabs<T extends string>({
  tabs,
  value,
  onChange,
  full = false,
  size = "md",
  className = "",
  ariaLabel,
}: SlidingTabsProps<T>) {
  const bar = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const first = useRef(true);

  const place = (animate: boolean) => {
    const b = bar.current,
      p = pill.current;
    if (!b || !p) return;
    const tab = b.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    if (!tab) return;
    if (!animate) {
      p.style.transition = "none";
      p.style.transform = `translateX(${tab.offsetLeft}px)`;
      p.style.width = `${tab.offsetWidth}px`;
      void p.offsetWidth; // reflow: commit the untransitioned position
      p.style.transition = "";
      return;
    }
    p.style.transform = `translateX(${tab.offsetLeft}px)`;
    p.style.width = `${tab.offsetWidth}px`;
  };

  useLayoutEffect(() => {
    place(!first.current);
    first.current = false;
  }, [value]);
  useLayoutEffect(() => {
    const b = bar.current;
    if (!b) return;
    const ro = new ResizeObserver(() => place(false));
    ro.observe(b);
    return () => ro.disconnect();
  }, []);

  const h = size === "sm" ? "h-9" : "h-11";
  return (
    <div
      ref={bar}
      role="tablist"
      aria-label={ariaLabel}
      className={`t-tabs ${full ? "flex w-full" : "inline-flex"} ${className}`}
    >
      <span ref={pill} className="t-tabs-pill" aria-hidden="true" />
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={t.id === value}
          onClick={() => onChange(t.id)}
          className={`t-tab ${h} ${full ? "flex-1" : ""}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
