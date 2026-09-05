"use client";

import { type ReactNode, useEffect, useRef } from "react";

// In-flow parallax for media inside a clipped card: the child drifts by
// `amount` px (±amount/2) as its parent travels through the viewport, so the
// picture moves slower than the frame around it. Wrap a video/image that is
// already oversized (scale-110 or so) so the drift never shows an edge.
// Same rAF-coalesced scroll listener as ExitLayer; nothing re-renders.
export default function Parallax({
  amount = 60,
  className = "",
  children,
}: {
  amount?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = el.parentElement ?? el;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = host.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the card's bottom is at the top of the viewport, +1 when its
      // top is at the bottom; 0 centred.
      const t = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / ((vh + r.height) / 2)));
      el.style.transform = `translate3d(0, ${(t * amount * 0.5).toFixed(2)}px, 0)`;
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
    };
  }, [amount]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
