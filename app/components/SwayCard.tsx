"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { HOUSE_SPRING, reducedMotion } from "./useSpringPress";

// Hover sway (ported from podbot's site): the card slides away from where the
// pointer came in (enter from the top-right → it moves toward the bottom-left)
// on the house spring, and springs back to rest on leave. Flat 2D only — a 3D
// tilt was tried there and rejected.
//
// The pointer listeners live on the OUTER slot, which never moves; only the
// inner card animates. Listening on the moving card itself feeds back: it
// slides away from a pointer that just entered at its edge, the pointer is
// outside, leave fires, it springs back under the pointer, enter fires…
// The slot is also what .stack-card transforms for the deal-out entrance, so
// the two motions never fight over one element.
const PUSH_PX = 18;
const REST = "translate(0px, 0px)";

type SwayCardProps = {
  slotClassName?: string;
  className?: string;
  children: ReactNode;
};

export default function SwayCard({
  slotClassName = "",
  className = "",
  children,
}: SwayCardProps) {
  const card = useRef<HTMLElement>(null);
  const anim = useRef<Animation | null>(null);

  const onEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const el = card.current;
    if (!el || e.pointerType === "touch" || reducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    // -1..1 across the slot, from the entry point.
    const dx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    const dy = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    const away = `translate(${(-dx * PUSH_PX).toFixed(1)}px, ${(-dy * PUSH_PX).toFixed(1)}px)`;
    const from = getComputedStyle(el).transform;
    anim.current?.cancel();
    anim.current = el.animate(
      [{ transform: from === "none" ? REST : from }, { transform: away }],
      { duration: 640, easing: HOUSE_SPRING, fill: "forwards" },
    );
  }, []);

  const onLeave = useCallback(() => {
    const el = card.current;
    if (!el || reducedMotion()) return;
    const from = getComputedStyle(el).transform;
    anim.current?.cancel();
    const a = el.animate(
      [{ transform: from === "none" ? REST : from }, { transform: REST }],
      { duration: 640, easing: HOUSE_SPRING, fill: "forwards" },
    );
    a.onfinish = () => {
      a.cancel();
      el.style.transform = "";
    };
    anim.current = a;
  }, []);

  return (
    <div onPointerEnter={onEnter} onPointerLeave={onLeave} className={slotClassName}>
      <article ref={card} className={`will-change-transform ${className}`}>
        {children}
      </article>
    </div>
  );
}
