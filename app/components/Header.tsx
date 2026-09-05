import Link from "next/link";
import { PillLink } from "./Pill";

const links = [
  { label: "services", href: "/#services" },
  { label: "projects", href: "/#projects" },
  { label: "about", href: "/#about" },
];

export default function Header() {
  return (
    // Translucent so it adapts as the page background transitions between
    // zones; drops in on mount (.chrome-in-down).
    <header className="chrome-in-down sticky top-0 z-50 backdrop-blur-md">
      <div className="shell flex items-center justify-between py-4 md:py-5">
        <div className="flex items-center gap-10 lg:gap-14">
          <Link
            href="/"
            className="font-display text-2xl md:text-[1.75rem] font-bold tracking-tight lowercase text-(--zone-ink) transition-colors duration-[400ms]"
          >
            elitebuilders
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link text-[0.95rem] font-medium lowercase text-(--zone-ink) transition-colors duration-[400ms]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <PillLink
          href="/quote"
          className="h-12 md:h-[3.5rem] px-6 md:px-10 text-sm md:text-base"
        >
          Request Quote
        </PillLink>
      </div>
    </header>
  );
}
