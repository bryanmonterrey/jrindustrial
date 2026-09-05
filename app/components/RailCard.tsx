import type { ReactNode } from "react";
import SwayCard from "./SwayCard";

type RailCardProps = {
  number?: string;
  tag: string;
  title: string;
  copy: string;
  chips?: readonly string[];
  /** A picture under the copy that does not change the card's size (children do). */
  visual?: ReactNode;
  /** Visual block rendered in the bottom zone of the card */
  children?: ReactNode;
};

// The outer slot is the .stack-card the rail deals out; the inner article is
// what SwayCard pushes around on hover (see SwayCard for why they're split).
export default function RailCard({
  number,
  tag,
  title,
  copy,
  chips = [],
  visual,
  children,
}: RailCardProps) {
  return (
    <SwayCard
      slotClassName={`stack-card w-[var(--card-w)] shrink-0 snap-start ${
        children ? "min-h-[36rem] md:aspect-505/711" : "min-h-[22rem]"
      }`}
      className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-[0_24px_60px_-40px_rgb(0_14_36/0.35)] md:p-11"
    >
      <div className="flex items-start justify-between">
        {number ? (
          <span className="font-display text-5xl md:text-6xl font-bold text-ink/10">
            {number}
          </span>
        ) : (
          <span />
        )}
        <span className="rounded-full bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink/60">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 font-display text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h3>
      <p className="mt-4 text-[0.95rem] md:text-base leading-relaxed text-ink/60">
        {copy}
      </p>
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink/50"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
      {/* Sized so the card stays at the rail's standard height — the rail stretches every card to the tallest. */}
      {visual && <div className="mt-auto w-[62%] pt-5">{visual}</div>}
      {children && <div className="mt-auto h-[38%] pt-6">{children}</div>}
    </SwayCard>
  );
}
