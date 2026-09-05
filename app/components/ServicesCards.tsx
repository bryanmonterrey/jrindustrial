import CardRail from "./CardRail";
import RailCard from "./RailCard";
import Reveal from "./Reveal";

const services = [
  {
    tag: "New builds",
    title: "Stucco systems",
    copy: "Full three-coat and one-coat systems for new construction, with color-integrated finishes — smooth santa barbara, lace, dash, or cat face.",
    chips: ["Three-coat", "One-coat", "Color finishes"],
    visual: "swatches",
  },
  {
    tag: "Repairs",
    title: "Repairs & restoration",
    copy: "Cracks, water damage, delamination, impact holes — we open it up, fix the cause, and match the existing texture and color so the patch disappears.",
    chips: ["Crack repair", "Water damage", "Texture match"],
    visual: "patch",
  },
  {
    tag: "Build-outs",
    title: "Remodels & additions",
    copy: "Room additions, garage conversions, and full exterior refreshes handled end-to-end — framing, coating, and paint under one contract.",
    chips: ["Additions", "Conversions", "Exteriors"],
    visual: "addition",
  },
] as const;

function ServiceVisual({ kind }: { kind: (typeof services)[number]["visual"] }) {
  if (kind === "swatches") {
    return (
      <div className="grid h-full grid-cols-2 gap-3 overflow-hidden rounded-[1.75rem] bg-[#efe6da] p-4">
        <div
          className="rounded-xl bg-[#d9c8b4]"
          style={{
            backgroundImage:
              "radial-gradient(#a08a70 1.5px, transparent 1.5px)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="rounded-xl bg-navy" />
        <div
          className="rounded-xl bg-blaze/15"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #207aff55 0, #207aff55 2px, transparent 2px, transparent 12px)",
          }}
        />
        <div className="rounded-xl bg-[#a08a70]" />
      </div>
    );
  }
  if (kind === "patch") {
    return (
      <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-navy">
        <svg
          viewBox="0 0 200 120"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0 78 L38 70 L58 84 L84 58 L104 66 L128 40 L152 50 L200 22"
            fill="none"
            stroke="#fff8f1"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
        </svg>
        <div className="absolute left-[38%] top-[28%] h-[44%] w-[34%] rotate-3 rounded-lg border-2 border-dashed border-blaze bg-blaze/15" />
      </div>
    );
  }
  return (
    <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-blaze/10">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#207aff 1px, transparent 1px), linear-gradient(90deg, #207aff 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* Existing structure + dashed addition */}
      <div className="absolute bottom-[18%] left-[16%] h-[48%] w-[34%] rounded-md bg-navy" />
      <div className="absolute bottom-[18%] left-[50%] h-[36%] w-[30%] rounded-md border-2 border-dashed border-blaze" />
    </div>
  );
}

export default function ServicesCards() {
  return (
    <section className="overflow-x-clip">
      {/* Second traveling title: starts in normal flow below the process
          cards, pins mid-viewport through its container, then docks above
          the services rail. */}
      <div className="pointer-events-none relative mt-20 h-[110vh]">
        <div className="sticky top-[38vh] px-6 text-center">
          <Reveal effect="blur-reveal">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-(--zone-ink)/50 transition-colors duration-[400ms]">
              Our services
            </p>
            <h2 className="mx-auto mt-4 max-w-[18ch] font-display font-bold leading-[1.02] tracking-tight text-[clamp(2rem,3.4vw+0.4rem,4.5rem)] text-(--zone-ink) transition-colors duration-[400ms]">
              Stucco, repairs, and everything between.
            </h2>
            <p className="mt-4 text-sm font-medium text-(--zone-ink)/40 transition-colors duration-[400ms]">
              Three ways we can help.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Zone start: second bg switch when the services rail reaches mid-viewport */}
      <div
        id="services"
        data-bg="#23252B"
        data-theme="dark"
        className="scroll-mt-28 pt-10"
      >
        <CardRail
          label="What we do"
          cardWidth="[--card-w:min(85vw,30rem)] 3xl:[--card-w:34rem]"
        >
          {services.map((service) => (
            <RailCard
              key={service.title}
              tag={service.tag}
              title={service.title}
              copy={service.copy}
              chips={service.chips}
            >
              <ServiceVisual kind={service.visual} />
            </RailCard>
          ))}
        </CardRail>
      </div>
    </section>
  );
}
