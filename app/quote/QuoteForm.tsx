"use client";

import { useState } from "react";
import { PillButton } from "../components/Pill";
import SuccessCheck from "../components/SuccessCheck";

const services = [
  "New stucco",
  "Stucco repair",
  "Remodel / addition",
  "General repair",
];

const inputClasses =
  "w-full rounded-2xl border border-ink/10 bg-white px-5 py-4 text-base text-ink placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-blaze/60 transition-shadow";

export default function QuoteForm() {
  const [service, setService] = useState(services[0]);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="pop-in rounded-[2.5rem] bg-white p-10 md:p-14 text-center shadow-[0_24px_60px_-40px_rgb(0_14_36/0.35)]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blaze text-cream">
          <SuccessCheck size={32} strokeWidth={5} />
        </div>
        <h2 className="mt-6 font-display text-3xl font-bold tracking-tight">
          Got it — talk soon.
        </h2>
        <p className="mx-auto mt-3 max-w-[40ch] text-ink/60">
          Your request is in. We&apos;ll call you back within one business day
          to set up the site walk.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: send to email/CRM (e.g. a route handler + Resend)
        setSubmitted(true);
      }}
      className="rounded-[2.5rem] bg-white p-7 md:p-12 shadow-[0_24px_60px_-40px_rgb(0_14_36/0.35)]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Phone</span>
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="(555) 555-0134"
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="jane@email.com"
            className={inputClasses}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold">
            Project address or city
          </span>
          <input
            name="location"
            autoComplete="address-level2"
            placeholder="City, neighborhood…"
            className={inputClasses}
          />
        </label>
      </div>

      <fieldset className="mt-7">
        <legend className="mb-3 text-sm font-semibold">
          What do you need?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {services.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="service"
                value={option}
                checked={service === option}
                onChange={() => setService(option)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors peer-checked:border-blaze peer-checked:bg-blaze peer-checked:text-white">
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-7 block">
        <span className="mb-2 block text-sm font-semibold">
          Tell us about the project
        </span>
        <textarea
          name="details"
          rows={5}
          placeholder="Square footage, current condition, finish you have in mind, timeline…"
          className={`${inputClasses} resize-y`}
        />
      </label>

      <PillButton
        type="submit"
        className="mt-8 h-14 w-full text-base md:w-auto md:px-14"
      >
        Send request
      </PillButton>
      <p className="mt-4 text-xs text-ink/40">
        We only use your info to contact you about this project.
      </p>
    </form>
  );
}
