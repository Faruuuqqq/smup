import Link from "next/link";
import { copyright, dashboardLinks } from "@/lib/site-nav";

export default function Footer() {
  return (
    <footer className="bg-primary text-ink">
      <div className="mx-auto max-w-[1140px] px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/footer-unpad.svg"
            alt="Universitas Padjadjaran"
            width={570}
            height={142}
            className="h-[60px] w-auto"
          />

          <nav className="flex items-center gap-2" aria-label="Dashboard">
            {dashboardLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-cta border border-ink/25 px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-center text-base text-ink-strong">{copyright}</p>
      </div>
    </footer>
  );
}
