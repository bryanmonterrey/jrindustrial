"use client";

import { useState, type FormEvent } from "react";
import TextSwap from "./TextSwap";

// The footer's sign-up box (podbot's footer, Phantom anatomy): oversized
// email field, a line of copy, a Sign-up pill. On submit the box's bottom
// row swaps for the outcome; the field keeps its size.
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "done">("idle");

  function submit(e: FormEvent) {
    e.preventDefault();
    // TODO: wire to an email service (Resend, Mailchimp, …)
    if (email.trim()) setState("done");
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white/[0.05] p-6 md:p-7">
      <label htmlFor="footer-email" className="sr-only">
        Email
      </label>
      <input
        id="footer-email"
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={state === "done"}
        placeholder="Enter your email"
        className="w-full bg-transparent font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-tight text-cream outline-none placeholder:text-cream/35 disabled:opacity-70"
      />
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] text-cream/70">
          {state === "done"
            ? "You're on the list. We'll email you when there's news."
            : "Seasonal maintenance tips and service reminders. No spam, ever."}
        </p>
        {state !== "done" && (
          <button
            type="submit"
            className="h-10 shrink-0 rounded-full bg-white/[0.1] px-5 text-[13px] font-medium text-cream transition-colors hover:bg-white/[0.16]"
          >
            <TextSwap text="Sign up" />
          </button>
        )}
      </div>
    </form>
  );
}
