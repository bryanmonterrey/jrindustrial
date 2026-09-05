import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

// Footer anatomy after Phantom's, via podbot's site: one big rounded card —
// the wordmark alone top-left and a status pill bottom-left; on the right a
// tall newsletter box with an oversized placeholder, a sentence and a Sign-up
// pill, then the link columns under it — and the © / legal line OUTSIDE the
// card.
type Mark = (props: { size?: number }) => React.ReactElement;

const InstagramMark: Mark = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookMark: Mark = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3z" />
  </svg>
);
const LinkedInMark: Mark = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6.9 8.6H3.4V21h3.5V8.6zM5.2 3a2 2 0 1 0 0 4.1 2 2 0 0 0 0-4.1zM20.6 21v-6.8c0-3.4-.7-6-4.7-6-1.9 0-3.2 1-3.7 2h-.1V8.6H8.8V21h3.5v-6.1c0-1.6.3-3.2 2.3-3.2s2.1 1.8 2.1 3.3V21h3.9z" />
  </svg>
);
const YelpMark: Mark = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M10.6 2.6c.3-.6 1.1-.8 1.7-.4l.2.2c.3.3.4.7.4 1.1l-.3 8.2c0 .8-.9 1.3-1.6.9l-.2-.1c-.3-.2-.5-.5-.6-.8L8.1 4.4c-.2-.6 0-1.2.5-1.5l2-.3zM4.4 9.6c-.6-.1-1.1-.7-1-1.3l.1-.3c.1-.4.4-.7.8-.8l3.2-1.2c.7-.3 1.4.3 1.3 1l-.4 3.4c-.1.6-.6 1-1.2.9l-2.8-1.7zM3.7 14.7c-.4-.3-.5-.9-.2-1.3l.2-.3c.2-.3.6-.5 1-.5l4.3.3c.7.1 1 .9.6 1.5l-1.9 2.6c-.4.5-1.1.6-1.5.2l-2.5-2.5zM9.8 21.3c-.5.3-1.2.1-1.4-.4l-.1-.3c-.2-.4-.1-.8.1-1.1l2.4-3.6c.4-.6 1.3-.5 1.6.2l1.1 3.2c.2.6-.1 1.2-.7 1.4l-3 .6zM20.5 15.7c.2.5-.1 1.1-.6 1.3l-.3.1c-.4.1-.8.1-1.1-.2l-3.5-2.5c-.6-.4-.5-1.3.2-1.6l3.1-1.2c.6-.2 1.2 0 1.5.6l.7 3.5zM19.6 9.6c.5-.2 1.1.1 1.3.6l.1.3c.1.4.1.8-.2 1.1l-2.7 3.3c-.5.6-1.4.3-1.5-.4l-.5-3.3c-.1-.6.3-1.2.9-1.3l2.6-.3z" />
  </svg>
);

type Col = { heading: string; links: { label: string; href: string; mark?: Mark }[] };
const columns: Col[] = [
  {
    heading: "Services",
    links: [
      { label: "Stucco systems", href: "/#services" },
      { label: "Exterior repair", href: "/#services" },
      { label: "Remodels & additions", href: "/#services" },
      { label: "Waterproofing", href: "/#services" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Our process", href: "/#process" },
      { label: "Projects", href: "/#projects" },
      { label: "About", href: "/#about" },
      { label: "Request a quote", href: "/quote" },
    ],
  },
  {
    heading: "Socials",
    links: [
      { label: "Instagram", href: "#", mark: InstagramMark },
      { label: "Facebook", href: "#", mark: FacebookMark },
      { label: "Yelp", href: "#", mark: YelpMark },
      { label: "LinkedIn", href: "#", mark: LinkedInMark },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="about" className="shell pb-24 pt-20 md:pt-32">
      {/* A step lighter than the page's #23252B bottom zone, plus a hairline,
          so the card still reads as a card on it. */}
      <div className="rounded-3xl bg-[#2b2d34] p-6 text-cream ring-1 ring-white/[0.06] md:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          {/* Left: the mark up top, the status pill at the bottom. */}
          <div className="flex flex-col justify-between gap-12">
            <Link
              href="/"
              aria-label="EliteBuilders home"
              className="inline-flex w-fit font-display text-3xl font-bold lowercase tracking-tight text-cream"
            >
              elitebuilders
            </Link>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/[0.06] px-3.5 py-2 text-[13px] font-medium text-cream/85">
              <span className="size-1.5 rounded-full bg-[#34c759]" />
              Licensed &amp; Insured
            </span>
          </div>

          {/* Right: newsletter box, then the columns. */}
          <div>
            <NewsletterForm />

            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.heading}>
                  <p className="text-[12px] text-cream/40">{col.heading}</p>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-[13px] text-cream/80 transition-colors hover:text-cream"
                        >
                          {link.mark && <link.mark size={13} />}
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The legal line lives outside the card. */}
      <div className="mt-4 flex flex-col gap-3 px-1 text-[12px] text-cream/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 EliteBuilders</p>
        <p className="flex gap-4">
          <Link href="#" className="hover:text-cream">
            Terms
          </Link>
          <Link href="#" className="hover:text-cream">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
