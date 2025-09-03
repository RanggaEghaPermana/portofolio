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
  const [hovered, setHovered] = useState < string | null > (null);

  // Aktifkan tracking section hanya di halaman "/"
  const activeSection = useActiveSection([
    "home", "projects", "skills", "experience", "contact"
  ], {
    enabled: pathname === "/",
    rootMargin: "-88px 0px -55% 0px"
  });

  const isActive = (href : string) => {
    if (href === "/") 
      return pathname === "/" && (!activeSection || activeSection === "home");
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      return pathname === "/" && activeSection === id;
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  const linkBase = "relative z-10 rounded-xl px-3 py-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";
  const liBase = "relative";
  const showPill = (href : string, label : string) => hovered
    ? hovered === label
    : isActive(href);

  return (<header className="sticky top-0 z-40 w-full">
    <div className="mx-auto max-w-6xl px-4 pt-4">
      {/* Shell kaca */}
      <div className="nav-glass rounded-2xl border border-slate-200/60 bg-white/25 backdrop-blur-xl supports-[backdrop-filter]:bg-white/25 dark:border-slate-800/60 dark:bg-slate-900/25">
        <nav className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
              RE
            </span>
          </Link>

          <ul className="relative flex items-center gap-2 text-sm">
            {
              navLinks.map((l) => (<li key={l.label} className={liBase} onMouseEnter={() => setHovered(l.label)} onMouseLeave={() => setHovered(null)}>
                {/* Pill kaca cair: saat hover; kalau tidak ada hover → item aktif */
                }
                {
                  showPill(l.href, l.label) && (<m.span layoutId="nav-gel-pill" transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 28,
                      mass: 0.55
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

    {/* Efek liquid-glass */}
    <style jsx="jsx" global="global">
      {
        ` .nav-glass {
          position: relative;
          overflow: hidden;
          /* bening + depth */
          backdrop-filter: blur(18px) saturate(170%) contrast(108%) brightness(112%);
          -webkit-backdrop-filter: blur(18px) saturate(170%) contrast(108%) brightness(112%);
          box-shadow: inset 0 0 0.7px rgba(255, 255, 255, 0.65), inset 0 -12px 26px rgba(2, 6, 23, 0.06), 0 12px 36px rgba(2, 6, 23, 0.08);
        }
        /* glare & rim pelangi tipis seperti referensi */
        .nav-glass::before {
          content: "";
          position: absolute;
          inset: -22% -10%;
          background: radial-gradient(140% 120% at 12% -10%, rgba(255, 255, 255, 0.45), transparent 55%), radial-gradient(90% 70% at 95% 0%, rgba(255, 255, 255, 0.18), transparent 60%);
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .nav-glass::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background: linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)), conic-gradient(from 180deg at 50% 0%, rgba(255, 115, 0, 0.22), rgba(56, 189, 248, 0.22), rgba(99, 102, 241, 0.24), rgba(16, 185, 129, 0.2), rgba(255, 115, 0, 0.22));
          -webkit-mask: linear-gradient(#000, #000) content-box, linear-gradient(#000, #000);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: 0.42;
          /* lebih tipis supaya 'bening' */
          filter: saturate(120%) blur(0.25px);
        }

        /* GEL PILL (hover/aktif) — jernih + rim pelangi */
        .gel-pill {
          border-radius: 0.8rem;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.65), rgba(255, 255, 255, 0.18)), radial-gradient(140% 160% at 10% 8%, rgba(255, 255, 255, 0.75), transparent 46%), radial-gradient(120% 140% at 92% 12%, rgba(255, 255, 255, 0.38), transparent 54%);
          backdrop-filter: blur(16px) saturate(180%) contrast(110%) brightness(112%);
          -webkit-backdrop-filter: blur(16px) saturate(180%) contrast(110%) brightness(112%);
          box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.8), inset 0 -10px 22px rgba(2, 6, 23, 0.07), 0 8px 26px rgba(2, 6, 23, 0.1);
        }
        .gel-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 0.9rem;
          /* rim kromatik */
          background: radial-gradient(60% 130% at 12% 16%, rgba(59, 130, 246, 0.34), transparent 60%), radial-gradient(70% 150% at 88% 18%, rgba(244, 63, 94, 0.3), transparent 62%), radial-gradient(80% 150% at 50% 100%, rgba(16, 185, 129, 0.26), transparent 65%);
          mix-blend-mode: screen;
          opacity: 0.7;
          filter: saturate(130%) blur(0.2px);
          pointer-events: none;
        }
        .gel-pill::after {
          /* inner cut 'U' tipis agar terlihat tebal dan bening */
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: 0.7rem;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
          -webkit-mask: radial-gradient(12px 12px at 14px 50%, transparent 49%, #000 51%) left / calc(50% - 10px) 100% no-repeat, radial-gradient(12px 12px at calc(100% - 14px) 50%, transparent 49%, #000 51%) right / calc(50% - 10px) 100% no-repeat, linear-gradient(#000, #000);
          mask: radial-gradient(12px 12px at 14px 50%, transparent 49%, #000 51%) left / calc(50% - 10px) 100% no-repeat, radial-gradient(12px 12px at calc(100% - 14px) 50%, transparent 49%, #000 51%) right / calc(50% - 10px) 100% no-repeat, linear-gradient(#000, #000);
          opacity: 0.5;
          pointer-events: none;
        }
         `
      }</style>
  </header>);
}
