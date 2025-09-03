// FILE: src/components/Nav.tsx
"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {m} from "framer-motion";
import {useState} from "react";
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
  }, { // halaman terpisah
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
  const [hovered, setHovered] = useState < string | null > (null);

  // Track section aktif hanya ketika berada di halaman "/"
  const activeSection = useActiveSection([
    "home", "projects", "skills", "experience", "contact"
  ], {
    enabled: pathname === "/",
    rootMargin: "-88px 0px -55% 0px"
  });

  // Tentukan item aktif (untuk "gel-pill" menetap)
  const isActive = (href : string) => {
    if (href === "/") 
      return pathname === "/" && (!activeSection || activeSection === "home");
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      return pathname === "/" && activeSection === id;
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  // Kelas link (desain teks tetap seperti sebelumnya)
  const linkBase = "relative z-10 rounded-xl px-3 py-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";
  const liBase = "relative";
  const showPill = (href : string, label : string) => hovered
    ? hovered === label
    : isActive(href);

  return (<header className="sticky top-0 z-40 w-full">
    <div className="mx-auto max-w-6xl px-4 pt-4">
      {/* Shell kaca utama */}
      <div className="nav-glass rounded-2xl border border-slate-200/60 bg-white/30 backdrop-blur supports-[backdrop-filter]:bg-white/30 dark:border-slate-800/60 dark:bg-slate-900/30">
        <nav className="flex items-center justify-between px-4 py-3">
          {/* Logo kecil (tetap) */}
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
              RE
            </span>
          </Link>

          <ul className="relative flex items-center gap-2 text-sm">
            {
              navLinks.map((l) => (<li key={l.label} className={liBase} onMouseEnter={() => setHovered(l.label)} onMouseLeave={() => setHovered(null)}>
                {/* Gel pill: muncul di item yang sedang di-hover, kalau tidak ada hover → item aktif */}
                {
                  showPill(l.href, l.label) && (<m.span layoutId="nav-gel-pill" transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                      mass: 0.6
                    }} className="gel-pill absolute inset-0 -z-0"/>)
                }

                <Link href={l.href} className={linkBase}>
                  {l.label}
                </Link>
              </li>))
            }
          </ul>
        </nav>
      </div>
    </div>

    {/* Styled-JSX (global) untuk efek liquid glass + chromatic edge */}
    <style jsx="jsx" global="global">
      {
        `
        /* Shell kaca membulat dengan edge 'liquid' halus */
        .nav-glass {
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 0.5px rgba(255, 255, 255, 0.6), 0 10px 30px rgba(2, 6, 23, 0.06);
        }
        .nav-glass::before {
          /* highlight diagonal + glare tipis */
          content: "";
          position: absolute;
          inset: -20% -10%;
          background: radial-gradient(120% 100% at 10% -10%, rgba(255, 255, 255, 0.35), transparent 55%), radial-gradient(90% 80% at 100% 0%, rgba(255, 255, 255, 0.14), transparent 60%);
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .nav-glass::after {
          /* Chromatic aberration very subtle di sisi atas/bawah (mirip contoh 1) */
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0)), conic-gradient(from 180deg at 50% 0%, rgba(255, 115, 0, 0.18), rgba(56, 189, 248, 0.18), rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.16), rgba(255, 115, 0, 0.18));
          -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
          /* tipis seperti border prisma */
          border-radius: 1rem;
          pointer-events: none;
          opacity: 0.55;
          filter: blur(0.3px) saturate(120%);
        }

        /* Gel pill (hover/aktif) — kaca cair yang memantul */
        .gel-pill {
          border-radius: 0.75rem;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.18)), radial-gradient(120% 140% at 10% 10%, rgba(255, 255, 255, 0.65), transparent 45%), radial-gradient(120% 140% at 90% 10%, rgba(255, 255, 255, 0.35), transparent 50%);
          backdrop-filter: blur(14px) saturate(175%);
          -webkit-backdrop-filter: blur(14px) saturate(175%);
          box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.7), inset 0 -8px 18px rgba(2, 6, 23, 0.06), 0 6px 22px rgba(2, 6, 23, 0.08);
        }
        .gel-pill::before {
          /* rim kromatik seperti gambar kedua */
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0.8rem;
          background: radial-gradient(60% 120% at 10% 10%, rgba(59, 130, 246, 0.28), transparent 55%), radial-gradient(70% 140% at 90% 20%, rgba(244, 63, 94, 0.25), transparent 60%), radial-gradient(60% 140% at 50% 100%, rgba(16, 185, 129, 0.22), transparent 60%);
          mix-blend-mode: screen;
          pointer-events: none;
          opacity: 0.6;
          filter: saturate(130%) blur(0.2px);
        }
        .gel-pill::after {
          /* inner cut seperti 'U' pill (ref foto kedua) */
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: 0.65rem;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
          -webkit-mask: radial-gradient(12px 12px at 14px 50%, transparent 49%, #000 51%) left / calc(50% - 10px) 100% no-repeat, radial-gradient(12px 12px at calc(100% - 14px) 50%, transparent 49%, #000 51%) right / calc(50% - 10px) 100% no-repeat, linear-gradient(#000, #000);
          mask: radial-gradient(12px 12px at 14px 50%, transparent 49%, #000 51%) left / calc(50% - 10px) 100% no-repeat, radial-gradient(12px 12px at calc(100% - 14px) 50%, transparent 49%, #000 51%) right / calc(50% - 10px) 100% no-repeat, linear-gradient(#000, #000);
          pointer-events: none;
          opacity: 0.45;
        }
         `
      }</style>
  </header>);
}
