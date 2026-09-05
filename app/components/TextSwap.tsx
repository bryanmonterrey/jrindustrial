"use client";

import { useEffect, useRef, useState } from "react";

// Transitions.dev "Text states swap" (globals.css: .t-text-swap): when
// `text` changes the old label slides up, blurs and fades; the new one
// enters from below. Three phases, driven here: exit → swap content +
// jump below (no transition) → reflow → release.
export default function TextSwap({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown === text) return;
    const dur = parseFloat(getComputedStyle(el).getPropertyValue("--text-swap-dur")) || 150;
    el.classList.add("is-exit");
    const t = setTimeout(() => {
      setShown(text);
      el.classList.remove("is-exit");
      el.classList.add("is-enter-start");
      void el.offsetHeight; // reflow so the jump lands before the release
      requestAnimationFrame(() => el.classList.remove("is-enter-start"));
    }, dur);
    return () => clearTimeout(t);
  }, [text, shown]);
  return (
    <span ref={ref} className={`t-text-swap ${className}`}>
      {shown}
    </span>
  );
}
