import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote — EliteBuilders",
  description:
    "Tell us about your project and get a fixed, line-item quote within 48 hours.",
};

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="shell pt-6 md:pt-12 pb-4">
        <div className="mx-auto max-w-[52rem]">
          <p className="rise text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-ink/50">
            Free · No obligation
          </p>
          <h1
            className="rise mt-3 font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.25rem,4vw+0.5rem,4.75rem)]"
            style={{ animationDelay: "120ms" }}
          >
            Request a quote.
          </h1>
          <p
            className="rise mt-4 max-w-[52ch] text-base md:text-lg text-ink/60"
            style={{ animationDelay: "240ms" }}
          >
            Tell us a little about the project. We&apos;ll call you back within
            one business day and get you a fixed, line-item quote within 48
            hours of the site walk.
          </p>
          <div className="rise mt-10" style={{ animationDelay: "360ms" }}>
            <QuoteForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
