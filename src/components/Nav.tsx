// FILE: src/components/Nav.tsx
"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useActiveSection} from "@/hooks/useActiveSection";

type NavItem = {
  href: string;
  label: string
};

const navLinks: NavItem[] = [
  {
    href: "/",
    label: "Home"
  }, {
    href: "/#projects",
    label: "Projects"
  }, {
    href: "/#skills",
    label: "Skills"
  }, {
    href: "/kompetensi",
    label: "Kompetensi"
  }, {
    href: "/#experience",
    label: "Experience"
  }, {
    href: "/dokumentasi",
    label: "Dokumentasi"
  }, {
    href: "/sertifikat",
    label: "Sertifikat"
  }, {
    href: "/#contact",
    label: "Contact"
  }
];

export default function Nav() {
  const pathname = usePathname();

  // SELALU dipanggil; aktif hanya ketika di halaman "/"
  const activeSection = useActiveSection([
    "home", "projects", "skills", "experience", "contact"
  ], {
    enabled: pathname === "/",
    rootMargin: "-88px 0px -55% 0px"
  });

  // Aturan aktif yang konsisten di semua kondisi
  const isActive = (href : string) => {
    if (href === "/") {
      // Di home dan belum terdeteksi apa pun, atau sedang berada di #home → Home aktif
      return pathname === "/" && (!activeSection || activeSection === "home");
    }
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      return pathname === "/" && activeSection === id;
    }
    // Halaman terpisah (mis. /kompetensi)
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  // Desain lama dipertahankan
  const base = "rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100";
  const activeCls = "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100";

  return (<header className="sticky top-0 z-40 w-full">
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <div className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/60 dark:bg-slate-900/50">
        <nav className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
              RE
            </span>
          </Link>

          <ul className="flex items-center gap-2 text-sm">
            {
              navLinks.map((l) => (<li key={l.label}>
                <Link href={l.href} className={`${base} ${isActive(l.href)
                    ? activeCls
                    : ""}`}>
                  {l.label}
                </Link>
              </li>))
            }
          </ul>
        </nav>
      </div>
    </div>
  </header>);
}
