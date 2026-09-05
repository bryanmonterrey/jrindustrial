"use client";

import { useEffect, useRef, useState } from "react";

// Transitions.dev "Success check" (globals.css: .t-success-check): a check
// that fades, un-rotates, un-blurs and bobs up while its stroke draws.
// `show` flips data-state to "in"; the dash length is measured from the path
// so the draw covers exactly the stroke.
export default function SuccessCheck({
  show = true,
  size = 48,
  strokeWidth = 4,
  className = "",
}: {
  show?: boolean;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const path = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(30);
  useEffect(() => {
    if (path.current) setLen(path.current.getTotalLength());
  }, []);
  return (
    <span
      className={`t-success-check ${className}`}
      data-state={show ? "in" : "out"}
      aria-hidden
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path ref={path} d="M13 25.5 L21 33 L35 16" style={{ strokeDasharray: len, strokeDashoffset: len }} />
      </svg>
    </span>
  );
}
