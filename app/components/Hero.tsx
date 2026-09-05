import ExitLayer from "./ExitLayer";
import { PillLink } from "./Pill";

export default function Hero() {
  return (
    <section className="shell pt-2 md:pt-4">
      {/* Exit parallax: the video card rises slowly as the page leaves the
          hero; the copy inside rises faster and blurs (podbot's hero rates:
          0.22 for the object, 0.5 net for the copy). */}
      <ExitLayer rate={0.22}>
      <div
        className="rise relative overflow-hidden rounded-xl md:rounded-3xl min-h-[34rem] md:min-h-0 md:aspect-[1394/872] 3xl:max-h-[70rem]"
        style={{ animationDelay: "100ms" }}
      >
        {/* Fallback scene shows until /videos/hero.mp4 is added to public/ */}
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 opacity-[0.13]"

          />
        </div>

        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Legibility gradient over the video */}
        <div className="absolute inset-0" />

        <ExitLayer rate={0.28} blur={10} className="absolute inset-x-0 bottom-0 p-7 md:p-14 lg:p-16 text-cream">
          <p
            className="rise text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-cream/70"
            style={{ animationDelay: "350ms" }}
          >
            Stucco · Construction · Repairs
          </p>
          <h1
            className="rise mt-4 max-w-[13ch] font-display font-bold leading-[0.98] tracking-tight text-[clamp(2.5rem,5.5vw+0.5rem,7.5rem)]"
            style={{ animationDelay: "450ms" }}
          >
            Built solid. Finished beautiful.
          </h1>
          <div
            className="rise mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
            style={{ animationDelay: "600ms" }}
          >
            <p className="max-w-[42ch] text-base md:text-lg text-cream/80">
              EliteBuilders delivers full-scope construction, three-coat stucco
              systems, and repairs that hold up — from first site walk to final
              coat.
            </p>
            <PillLink
              href="/quote"
              chevron
              className="h-13 md:h-[3.75rem] px-8 md:px-10 text-base shrink-0 self-start sm:self-auto"
            >
              Request Quote
            </PillLink>
          </div>
        </ExitLayer>
      </div>
      </ExitLayer>
    </section>
  );
}
