"use client";

import { type ReactNode, useEffect, useRef } from "react";

// Hero exit parallax (podbot's site, watchparty's landing / cash.app hero):
// as the page scrolls off the hero, each layer rises at its own rate (a
// fraction of the viewport height), fades, and optionally blurs — layers
// drifting apart for depth. `distance` is how much scroll completes the
// exit, as a fraction of the viewport (0.6 = the hero is gone by 60% of a
// screen). No motion library: one rAF-coalesced scroll listener writes the
// styles straight to the node, so React never re-renders per frame.
type ExitLayerProps = {
  /** How far the layer rises over the exit, as a fraction of the viewport height. */
  rate?: number;
  /** Blur at full exit, in px. */
  blur?: number;
  distance?: number;
  className?: string;
  children: ReactNode;
};

export default function ExitLayer({
  rate = 0.35,
  blur = 0,
  distance = 0.6,
  className = "",
  children,
}: ExitLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / (vh * distance)));
      el.style.transform = `translate3d(0, ${(-p * rate * vh).toFixed(2)}px, 0)`;
      el.style.opacity = String(1 - p);
      el.style.filter = blur ? `blur(${(p * blur).toFixed(2)}px)` : "";
      el.style.visibility = p >= 1 ? "hidden" : "visible";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
      el.style.opacity = "";
      el.style.filter = "";
      el.style.visibility = "";
    };
  }, [rate, blur, distance]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
