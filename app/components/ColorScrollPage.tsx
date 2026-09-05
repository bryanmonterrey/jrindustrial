"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Zone = { bg: string; dark: boolean };

/** Phantom-style scroll background (pattern from watchparty's marketing
 *  pages): one solid page color that transitions as zones scroll in. Mark a
 *  zone with `data-bg="<css color>"` (plus `data-theme="dark"` for dark
 *  zones); whichever zone's top has last crossed ~45% of the viewport owns
 *  the background. The color is painted on <html> — NOT on this wrapper —
 *  so the sliding titles (negative z-index) stay visible above it. Dark
 *  zones flip `--zone-ink` to cream for text that sits on the page canvas. */
export default function ColorScrollPage({
  children,
  initial,
}: {
  children: ReactNode;
  initial: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [zone, setZone] = useState<Zone>({ bg: initial, dark: false });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const zones = Array.from(root.querySelectorAll<HTMLElement>("[data-bg]"));
    if (!zones.length) return;

    let raf = 0;
    let current = initial;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let pick: Zone = { bg: initial, dark: false };
      for (const el of zones) {
        if (el.getBoundingClientRect().top <= line)
          pick = { bg: el.dataset.bg || pick.bg, dark: el.dataset.theme === "dark" };
      }
      if (pick.bg !== current) {
        current = pick.bg;
        setZone(pick);
      }
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
    };
  }, [initial]);

  // 400ms easeOutQuint on <html> = Phantom's measured house transition
  useEffect(() => {
    const el = document.documentElement;
    el.style.transition = "background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.backgroundColor = zone.bg;
    return () => {
      el.style.backgroundColor = "";
    };
  }, [zone.bg]);

  return (
    <div
      ref={ref}
      className="flex min-h-full flex-1 flex-col"
      style={
        {
          "--zone-ink": zone.dark ? "var(--color-cream)" : "var(--color-ink)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
