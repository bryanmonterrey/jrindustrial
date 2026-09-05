import Link from "next/link";
import { PillLink } from "./Pill";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

export default function Showcase() {
  return (
    <section id="projects" className="shell pt-20 md:pt-32">
      <Reveal>
        <div className="grain relative min-h-[30rem] overflow-hidden rounded-3xl bg-black md:rounded-3xl md:aspect-[1394/720] 3xl:max-h-[60rem]">
          {/* Fallback scene shows until /videos/craft.mp4 is added to public/ */}
          <div className="absolute inset-0">
            
          </div>

          {/* The footage drifts slower than its frame as the card scrolls by;
              scaled up so the drift never shows an edge. */}
          <Parallax amount={80} className="absolute inset-0">
            <video
              className="absolute inset-0 h-full w-full scale-110 object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/craft.mp4" type="video/mp4" />
            </video>
          </Parallax>

          <div className="absolute inset-0 bg-navy/45" />

          <div className="relative flex h-full min-h-[30rem] flex-col items-center justify-center px-7 py-16 text-center text-cream">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-cream/60">
              The craft, up close
            </p>
            <h2 className="mt-4 max-w-[16ch] font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.25rem,4vw+0.5rem,5.5rem)]">
              Every coat, troweled by hand.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base md:text-lg text-cream/70">
              Smooth santa barbara, cat face, dash, or lace — watch how a wall
              goes from bare lath to a finish that lasts decades.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <PillLink
                href="/quote"
                className="h-13 md:h-[3.75rem] px-9 md:px-11 text-base"
              >
                Request Quote
              </PillLink>
              <Link
                href="/#process"
                className="rounded-full border border-cream/30 px-8 py-3.5 text-base font-medium text-cream/90 transition-colors hover:border-cream/70"
              >
                See our process
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
