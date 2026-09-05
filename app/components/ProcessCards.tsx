import CardRail from "./CardRail";
import RailCard from "./RailCard";

const phases = [
  {
    number: "01",
    tag: "Consult",
    title: "Walk & plan",
    copy: "We walk the site, measure everything, and talk through what you actually need. You get a fixed, line-item quote within 48 hours — nothing buried in fine print.",
    chips: ["Site walk", "Scope", "Fixed quote"],
    visual: "blueprint",
  },
  {
    number: "02",
    tag: "Prep",
    title: "Frame & lath",
    copy: "Old cladding comes off, sheathing gets repaired, and the moisture barrier and wire lath go up tight. Prep is where stucco jobs are won or lost, so we never rush it.",
    chips: ["Demo", "Moisture barrier", "Wire lath"],
    visual: "lath",
  },
  {
    number: "03",
    tag: "Build",
    title: "Coat & cure",
    copy: "Scratch, brown, finish — the full three-coat system, weather-checked at every stage, so the wall cures as strong as it looks.",
    chips: ["Scratch coat", "Brown coat", "Finish"],
    visual: "coats",
  },
  {
    number: "04",
    tag: "Deliver",
    title: "Inspect & care",
    copy: "We inspect every elevation with you, leave the site cleaner than we found it, and back the work with a 10-year workmanship warranty.",
    chips: ["Walkthrough", "Cleanup", "10-yr warranty"],
    visual: "seal",
  },
] as const;

function PhaseVisual({ kind }: { kind: (typeof phases)[number]["visual"] }) {
  if (kind === "blueprint") {
    return (
      <div className="relative h-full overflow-hidden rounded-2xl bg-navy">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(#207aff 1px, transparent 1px), linear-gradient(90deg, #207aff 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute left-[18%] top-[22%] h-[56%] w-[44%] rounded-lg border-2 border-dashed border-blaze/80" />
        <div className="absolute right-[14%] bottom-[20%] h-[34%] w-[26%] rounded-lg border-2 border-dashed border-cream/50" />
      </div>
    );
  }
  if (kind === "lath") {
    return (
      <div
        className="relative h-full overflow-hidden rounded-[1.75rem] bg-[#efe6da]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #a08a7055 0, #a08a7055 2px, transparent 2px, transparent 22px), repeating-linear-gradient(-45deg, #a08a7055 0, #a08a7055 2px, transparent 2px, transparent 22px)",
        }}
      >
        <div className="absolute inset-x-5 top-5 h-3 rounded-full bg-navy/80" />
        <div className="absolute inset-x-5 bottom-5 h-3 rounded-full bg-navy/80" />
      </div>
    );
  }
  if (kind === "coats") {
    return (
      <div className="relative flex h-full flex-col justify-end gap-2 overflow-hidden rounded-[1.75rem] bg-[#efe6da] p-5">
        <div className="h-[22%] rounded-xl bg-[#c9b8a3]" />
        <div className="h-[22%] rounded-xl bg-[#a08a70]" />
        <div className="h-[22%] rounded-xl bg-navy" />
        <div className="h-[22%] rounded-xl bg-blaze" />
      </div>
    );
  }
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-blaze/10">
      <div className="flex size-[55%] items-center justify-center rounded-full border-2 border-dashed border-blaze/60">
        <div className="flex size-[70%] items-center justify-center rounded-full bg-blaze text-cream">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-[42%]"
          >
            <path d="M4 12.5l5 5L20 6.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ProcessCards() {
  return (
    <section className="overflow-x-clip">
      {/* Pinned title: starts below the hero (no pull under it — the hero's
          exit parallax fades, so anything tucked beneath it would ghost
          through), pins mid-viewport while the page scrolls past, and docks
          just above the cards when its tall container runs out. */}
      <div className="pointer-events-none relative -z-10 mt-6 h-[95vh]">
        <div className="sticky top-[38vh] px-6 text-center">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-(--zone-ink)/50 transition-colors duration-[400ms]">
            Our process
          </p>
          <h2 className="mx-auto mt-4 max-w-[18ch] font-display font-bold leading-[1.02] tracking-tight text-[clamp(2rem,3.4vw+0.4rem,4.5rem)] text-(--zone-ink) transition-colors duration-[400ms]">
            From first walk to final coat.
          </h2>
          <p className="mt-4 text-sm font-medium text-(--zone-ink)/40 transition-colors duration-[400ms]">
            Every build runs the same four phases.
          </p>
        </div>
      </div>

      {/* Zone start: bg transitions when the rail reaches mid-viewport */}
      <div
        id="process"
        data-bg="#000E24"
        data-theme="dark"
        className="scroll-mt-28 pt-10"
      >
        <CardRail label="How it works">
          {phases.map((phase) => (
            <RailCard
              key={phase.number}
              number={phase.number}
              tag={phase.tag}
              title={phase.title}
              copy={phase.copy}
              chips={phase.chips}
            >
              <PhaseVisual kind={phase.visual} />
            </RailCard>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
