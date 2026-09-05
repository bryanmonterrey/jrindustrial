"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useSpringPress } from "./useSpringPress";

// The .btn-pill CTA with podbot's press bounce (useSpringPress): squash on
// pointer-down, pop past rest and spring home on release. `chevron` adds
// Transitions.dev's "Learn more" chevron — on hover it shifts right and its
// arms open (globals.css .t-learn) — for the hero's call to action.

function Chevron() {
  return (
    <span className="t-learn-chevron -me-1">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
        <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
      </svg>
    </span>
  );
}

type PillLinkProps = ComponentProps<typeof Link> & {
  chevron?: boolean;
  children: ReactNode;
};

export function PillLink({ chevron = false, className = "", children, ...props }: PillLinkProps) {
  const onPointerDown = useSpringPress();
  return (
    <Link
      {...props}
      onPointerDown={onPointerDown}
      className={`btn-pill ${chevron ? "t-learn " : ""}will-change-transform ${className}`}
    >
      {children}
      {chevron && <Chevron />}
    </Link>
  );
}

type PillButtonProps = ComponentProps<"button"> & {
  chevron?: boolean;
  children: ReactNode;
};

export function PillButton({ chevron = false, className = "", children, ...props }: PillButtonProps) {
  const onPointerDown = useSpringPress();
  return (
    <button
      type="button"
      {...props}
      onPointerDown={onPointerDown}
      className={`btn-pill ${chevron ? "t-learn " : ""}will-change-transform ${className}`}
    >
      {children}
      {chevron && <Chevron />}
    </button>
  );
}
