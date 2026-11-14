"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardLinks } from "@/lib/site-nav";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-glass backdrop-blur-[16.291px]">
      {/* Baris utilitas desain aslinya: sengaja dibiarkan kosong sampai ada kontennya. */}
      <div className="h-10 bg-primary" />

      <div className="mx-auto flex max-w-[1140px] items-center gap-3 px-4 py-2 sm:gap-4">
        <Link href="/" aria-label="Beranda" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-unpad-duo.svg" alt="Logo" width={220} height={55} className="h-8 w-auto sm:h-[52px]" />
        </Link>

        <nav className="ml-auto flex items-center gap-2" aria-label="Dashboard">
          {dashboardLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-cta px-4 py-2 text-sm font-semibold transition-colors sm:px-5 ${
                  active ? "bg-primary text-ink" : "border border-border bg-surface/70 text-ink hover:bg-primary-subtle"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
