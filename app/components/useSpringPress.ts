"use client";

import { useCallback, useRef } from "react";

// The house spring + press bounce, ported from podbot's site
// (components/spring-press.ts, liquid-taffy lineage): pointer-down squashes
// the element, release pops it past rest and lets the spring ring it back.
// Sampled spring curves handed to the Web Animations API as CSS linear()
// easings — no animation library needed.

/* House spring: ζ=0.434, ω=22.46 — 22% overshoot, ring, settle. */
const HOUSE_SPRING_POINTS: readonly [number, number][] = [
  [0.028, 0.0289], [0.056, 0.1062], [0.083, 0.2182], [0.111, 0.3519],
  [0.139, 0.4957], [0.167, 0.6396], [0.194, 0.7755], [0.222, 0.8974],
  [0.25, 1.0013], [0.278, 1.0849], [0.306, 1.1474], [0.333, 1.1896],
  [0.361, 1.213], [0.389, 1.22], [0.417, 1.2134], [0.444, 1.1961],
  [0.472, 1.1714], [0.5, 1.1419], [0.528, 1.1102], [0.556, 1.0786],
  [0.583, 1.0487], [0.611, 1.022], [0.639, 0.9992], [0.667, 0.981],
  [0.694, 0.9673], [0.722, 0.9581], [0.75, 0.9531], [0.778, 0.9516],
  [0.806, 0.9531], [0.833, 0.957], [0.861, 0.9624], [0.889, 0.969],
  [0.917, 0.9759], [0.944, 0.9829], [0.972, 0.9894], [1, 1],
];
export const HOUSE_SPRING = `linear(0, ${HOUSE_SPRING_POINTS.map(
  ([x, y]) => `${y} ${(x * 100).toFixed(1)}%`,
).join(", ")})`;
const OUT_STRONG = "cubic-bezier(0.215, 0.61, 0.355, 1)"; // power3.out

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Returns an onPointerDown for a button/link: squash on press, pop + spring on release. */
export function useSpringPress(pop = 1.1) {
  const anim = useRef<Animation | null>(null);
  return useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.button !== 0 || reducedMotion()) return;
      const el = event.currentTarget;
      anim.current?.cancel();
      // Press: a little narrower, more shorter.
      anim.current = el.animate(
        [{ transform: "scale(1, 1)" }, { transform: "scale(0.985, 0.96)" }],
        { duration: 120, easing: OUT_STRONG, fill: "forwards" },
      );
      const release = () => {
        anim.current?.cancel();
        // Release: pop past rest, then the house spring rings it home.
        const a = el.animate(
          [
            { transform: "scale(0.985, 0.96)", easing: OUT_STRONG, offset: 0 },
            { transform: `scale(${pop})`, easing: HOUSE_SPRING, offset: 0.28 },
            { transform: "scale(1)", offset: 1 },
          ],
          { duration: 470, fill: "forwards" },
        );
        a.onfinish = () => {
          a.cancel();
          el.style.transform = "";
        };
        anim.current = a;
      };
      window.addEventListener("pointerup", release, { once: true });
      window.addEventListener("pointercancel", release, { once: true });
    },
    [pop],
  );
}
