"use client";

import { useEffect, useRef, useState } from "react";

// A number that pops in digit by digit when it changes — Transitions.dev's
// "Number pop-in" (globals.css: .t-digit-group / .t-digit). Every character
// of the formatted value is a digit cell, staggered left to right; the first
// render doesn't animate, each change remounts the group so the keyframes
// replay. Wrap any price, count or quantity that can change on screen.
export default function Digits({ value, className = "" }: { value: string | number; className?: string }) {
  const text = String(value);
  const prev = useRef(text);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (prev.current === text) return;
    prev.current = text;
    setRun((r) => r + 1);
  }, [text]);
  return (
    <span key={run} className={`t-digit-group ${run ? "is-animating" : ""} ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="t-digit"
          aria-hidden
          style={i ? { animationDelay: `calc(var(--digit-stagger) * ${Math.min(i, 8)})` } : undefined}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
