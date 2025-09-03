// FILE: src/components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useGlassFx } from "@/hooks/useGlassFx";

type NavItem = { href: string; label: string };

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/kompetensi", label: "Kompetensi" },
  { href: "/#experience", label: "Experience" },
  { href: "/dokumentasi", label: "Dokumentasi" },
  { href: "/sertifikat", label: "Sertifikat" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  // aktif-kan tracking section hanya di "/"
  const activeSection = useActiveSection(
    ["home", "projects", "skills", "experience", "contact"],
    { enabled: pathname === "/", rootMargin: "-88px 0px -55% 0px" }
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && (!activeSection || activeSection === "home");
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      return pathname === "/" && activeSection === id;
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  // refs untuk hitung posisi tiap item → pill bergerak absolut di dalam <ul>
  const listRef = useRef<HTMLUListElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  useGlassFx(shellRef); // glare reaktif scroll & mouse

  const currentLabel =
    hovered ??
    navLinks.find((n) => isActive(n.href))?.label ??
    navLinks[0].label;

  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const lastLeft = useRef(0);
  const [dx, setDx] = useState(0); // jarak gerak terakhir (untuk squish)

  const measure = () => {
    const ul = listRef.current;
    const li = itemRefs.current[currentLabel ?? ""];
    if (!ul || !li) return;
    const rList = ul.getBoundingClientRect();
    const r = li.getBoundingClientRect();
    const next = {
      left: r.left - rList.left,
      top: r.top - rList.top,
      width: r.width,
      height: r.height,
    };
    setPill((prev) => {
      if (prev.left !== next.left) setDx(next.left - prev.left);
      return next;
    });

    // geser glare di shell sesuai center pill (biar “objek lewat → kena pantul”)
    const center = ((next.left + next.width / 2) / Math.max(1, rList.width)) * 100;
    shellRef.current?.style.setProperty("--glass-gx", `${center.toFixed(2)}%`);
  };

  useLayoutEffect(() => {
    measure();
    // resize observer supaya tetap pas saat window berubah
    const ro = new ResizeObserver(() => measure());
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLabel, pathname, activeSection]);

  const linkBase =
    "relative z-10 rounded-xl px-3 py-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";

  // skala “squish” berdasar kecepatan perpindahan
  const squish = Math.min(0.28, Math.abs(dx) / 160); // 0..0.28

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div
          ref={shellRef}
          className="nav-glass rounded-2xl border border-slate-200/60 bg-white/20 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20 dark:border-slate-800/60 dark:bg-slate-900/20"
        >
          <nav className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
                RE
              </span>
            </Link>

            <ul ref={listRef} className="relative flex items-center gap-2 text-sm">
              {/* pill cair absolut di dalam <ul> */}
              <m.span
                key="liquid-pill"
                className="liquid-pill absolute -z-0"
                initial={false}
                animate={{
                  left: pill.left,
                  top: pill.top,
                  width: pill.width,
                  height: pill.height,
                  // stretch & squash (memantul) tergantung dx
                  scaleX: 1 + squish,
                  scaleY: 1 - squish / 2,
                  borderRadius: 14,
                }}
                transition={{
                  type: "spring",
                  stiffness: 720,
                  damping: 30,
                  mass: 0.55,
                }}
                style={
                  {
                    // variabel buat ekor/metaball
                    ["--dx" as any]: dx,
                  } as React.CSSProperties
                }
              />

              {navLinks.map((l) => (
                <li
                  key={l.label}
                  ref={(el) => (itemRefs.current[l.label] = el)}
                  className="relative"
                  onMouseEnter={() => setHovered(l.label)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    href={l.href}
                    className={`${linkBase} ${
                      isActive(l.href)
                        ? "text-slate-900 dark:text-white drop-shadow-[0_0.5px_0_rgba(255,255,255,0.35)]"
                        : ""
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* styles: kaca bening + pill cair dengan ekor metaball */}
      <style jsx global>{`
        :root {
          --glass-gx: 50%;  /* posisi glare X (dipompa JS) */
          --glass-vel: 0;   /* dipakai hook scroll (useGlassFx) */
        }

        .nav-glass {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px) saturate(185%) contrast(112%) brightness(114%);
          -webkit-backdrop-filter: blur(20px) saturate(185%) contrast(112%) brightness(114%);
          box-shadow:
            inset 0 0 0.7px rgba(255,255,255,0.65),
            inset 0 -12px 26px rgba(2,6,23,0.06),
            0 12px 36px rgba(2,6,23,0.08);
          background:
            radial-gradient(
              120% 200% at var(--glass-gx) calc(0% + var(--glass-vel)*2%),
              rgba(255,255,255,0.22) 0%,
              rgba(255,255,255,0.06) 30%,
              transparent 60%
            ),
            linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.06));
        }
        .nav-glass::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          padding: 1px;
          background:
            linear-gradient(0deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02)),
            conic-gradient(
              from 180deg at 50% 0%,
              rgba(255,115,0,0.22),
              rgba(56,189,248,0.22),
              rgba(99,102,241,0.24),
              rgba(16,185,129,0.20),
              rgba(255,115,0,0.22)
            );
          -webkit-mask: linear-gradient(#000,#000) content-box, linear-gradient(#000,#000);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
          opacity: 0.40;
          filter: saturate(120%) blur(0.25px);
        }

        /* ===== LIQUID PILL ===== */
        .liquid-pill {
          border-radius: 14px;
          /* inti kaca + glare */
          background:
            radial-gradient(120% 140% at 50% 12%, rgba(255,255,255,0.75), transparent 46%),
            radial-gradient(120% 140% at 92% 12%, rgba(255,255,255,0.38), transparent 54%),
            linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.18));
          backdrop-filter: blur(16px) saturate(190%) contrast(112%) brightness(114%);
          -webkit-backdrop-filter: blur(16px) saturate(190%) contrast(112%) brightness(114%);
          box-shadow:
            inset 0 0 1px rgba(255,255,255,0.8),
            inset 0 -10px 22px rgba(2,6,23,0.07),
            0 8px 26px rgba(2,6,23,0.10);
          /* “ekor” metaball (bereaksi pada kecepatan / --dx) */
          isolation: isolate;
        }
        .liquid-pill::before {
          /* rim pelangi */
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background:
            radial-gradient(60% 130% at 12% 16%, rgba(59,130,246,0.34), transparent 60%),
            radial-gradient(70% 150% at 88% 18%, rgba(244,63,94,0.30), transparent 62%),
            radial-gradient(80% 150% at 50% 100%, rgba(16,185,129,0.26), transparent 65%);
          mix-blend-mode: screen;
          opacity: 0.72;
          filter: saturate(130%) blur(0.2px);
          pointer-events: none;
        }
        .liquid-pill::after {
          /* ekor cair: memanjang sesuai |--dx| lalu memendek (memantul) */
          content: "";
          position: absolute;
          inset: 3px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05));
          -webkit-mask:
            radial-gradient(12px 12px at 14px 50%, transparent 49%, #000 51%) left / calc(50% - 10px) 100% no-repeat,
            radial-gradient(12px 12px at calc(100% - 14px) 50%, transparent 49%, #000 51%) right / calc(50% - 10px) 100% no-repeat,
            linear-gradient(#000,#000);
          mask:
            radial-gradient(12px 12px at 14px 50%, transparent 49%, #000 51%) left / calc(50% - 10px) 100% no-repeat,
            radial-gradient(12px 12px at calc(100% - 14px) 50%, transparent 49%, #000 51%) right / calc(50% - 10px) 100% no-repeat,
            linear-gradient(#000,#000);
          pointer-events: none;
          opacity: 0.5;
          transform-origin: center;
          transform: scaleX(calc(1 + min(max(abs(var(--dx)) / 140, 0), 0.45)))
                     scaleY(calc(1 - min(max(abs(var(--dx)) / 280, 0), 0.18)));
          transition: transform 300ms cubic-bezier(.25,.9,.25,1.1);
        }
      `}</style>
    </header>
  );
}
