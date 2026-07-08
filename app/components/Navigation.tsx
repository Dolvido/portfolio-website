"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, profile } from "../data/portfolio";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--ink)] bg-[rgba(242,239,231,0.9)] subtle-blur-backdrop">
      <nav className="container flex min-h-[62px] flex-col justify-center gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <Link href="/" className="text-sm font-bold uppercase">
          Luke Payne
        </Link>

        <div className="flex items-center gap-3 overflow-x-auto text-xs font-semibold uppercase md:gap-7">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b px-1 py-1 transition-colors ${
                  isActive
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--ink)] hover:text-[var(--accent)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden whitespace-nowrap text-xs font-semibold uppercase text-[var(--accent)] lg:block">
          {profile.status}
        </div>
      </nav>
    </header>
  );
}
