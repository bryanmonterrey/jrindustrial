"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Chevron({ dir }: { dir: 1 | -1 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
    >
      {dir === 1 ? <path d="M9 5l7 7-7 7" /> : <path d="M15 5l-7 7 7 7" />}
    </svg>
  );
}

type CardRailProps = {
  /** Section tag pill shown top-left, à la Phantom's "Your security" */
  label?: ReactNode;
  /** Tailwind classes setting --card-w; must make the rail overflow or the
   *  paging arrows stay disabled. */
  cardWidth?: string;
  children: ReactNode;
};

/** Horizontal card rail with Phantom-style stack-then-spring entrance and
 *  prev/next paging arrows. Cards must be direct children (.stack-card). */
export default function CardRail({
  label,
  cardWidth = "[--card-w:min(85vw,26rem)] 3xl:[--card-w:30rem]",
  children,
}: CardRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rail.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(rail);

    const update = () => {
      setCanPrev(rail.scrollLeft > 2);
      setCanNext(rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 2);
    };
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      io.disconnect();
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const page = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const [first, second] = rail.children as unknown as HTMLElement[];
    const step =
      second && first
        ? second.offsetLeft - first.offsetLeft
        : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrowClasses =
    "flex size-11 items-center justify-center rounded-full bg-navy-deep text-cream ring-1 ring-white/15 transition-[background-color,opacity,transform] duration-300 hover:bg-blaze active:scale-95 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div className="shell flex items-end justify-between">
        {label ? (
          <span className="inline-flex items-center gap-2.5 rounded-full bg-navy-deep px-5 py-2.5 text-sm font-medium text-cream/90 ring-1 ring-white/15">
            <span className="size-2 rounded-full bg-blaze" />
            {label}
          </span>
        ) : (
          <span />
        )}
        <div className="hidden gap-2.5 md:flex">
          <button
            type="button"
            aria-label="Previous cards"
            disabled={!canPrev}
            onClick={() => page(-1)}
            className={arrowClasses}
          >
            <Chevron dir={-1} />
          </button>
          <button
            type="button"
            aria-label="Next cards"
            disabled={!canNext}
            onClick={() => page(1)}
            className={arrowClasses}
          >
            <Chevron dir={1} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        // overflow-x:auto makes the box clip vertically too, so the breathing
        // room lives inside it as padding (not margin): pt-6 for the hover
        // sway, pb-12 for the mobile rise (2.5rem) and the card shadow.
        className={`stack-rail rail rail-pad -mb-4 flex snap-x snap-mandatory gap-8 overflow-x-auto pt-6 pb-12 md:snap-none lg:gap-12 [--rail-gap:2rem] lg:[--rail-gap:3rem] ${cardWidth}`}
      >
        {children}
      </div>
    </div>
  );
}
