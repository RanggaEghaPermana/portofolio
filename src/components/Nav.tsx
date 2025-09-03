// FILE: src/components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLensCanvas } from "@/hooks/useLensCanvas";

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

  // Aktif berdasar path + hash (stabil, tanpa observer)
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string>("Home");

  useEffect(() => {
    const mapHash: Record<string, string> = {
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    };
    const byPath = () => {
      if (pathname === "/") return "Home";
      if (pathname.startsWith("/kompetensi")) return "Kompetensi";
      if (pathname.startsWith("/dokumentasi")) return "Dokumentasi";
      if (pathname.startsWith("/sertifikat")) return "Sertifikat";
      return "Home";
    };
    if (typeof window !== "undefined" && pathname === "/") {
      const h = window.location.hash.replace("#", "");
      setActiveLabel(mapHash[h] ?? byPath());
      const onHash = () => {
        const hh = window.location.hash.replace("#", "");
        setActiveLabel(mapHash[hh] ?? "Home");
      };
      window.addEventListener("hashchange", onHash);
      return () => window.removeEventListener("hashchange", onHash);
    } else {
      setActiveLabel(byPath());
    }
  }, [pathname]);

  // ===================== MEASURE LIQUID PILL =====================
  const listRef = useRef<HTMLUListElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const lensSlotRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const currentLabel = (hovered ?? activeLabel ?? navLinks[0].label) as string;

  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [dx, setDx] = useState(0); // delta gerak → squish (pantul)

  const measure = () => {
    const ul = listRef.current;
    const li = itemRefs.current[currentLabel ?? ""];
    if (!ul || !li) return;

    const rList = ul.getBoundingClientRect();
    const r = li.getBoundingClientRect();

    setDx((prev) => (isFinite(prev) ? (r.left - rList.left) - pill.left : 0));

    const next = {
      left: r.left - rList.left,
      top: r.top - rList.top,
      width: r.width,
      height: r.height,
    };
    setPill(next);

    // Sinkronkan posisi snapshot terhadap scroll
    const cx = next.left + next.width / 2;
    shellRef.current?.style.setProperty("--pill-cx", `${cx.toFixed(2)}px`);
  };

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLabel, pathname]);

  // Geser snapshot mengikuti scroll (cukup update CSS var)
  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    let raf: number | null = null;

    const put = () => {
      el.style.setProperty("--bg-x", `${-window.scrollX}px`);
      el.style.setProperty("--bg-y", `${-window.scrollY}px`);
      el.style.setProperty("--bg-w", `${document.documentElement.scrollWidth}px`);
      el.style.setProperty("--bg-h", `${document.documentElement.scrollHeight}px`);
    };
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(put);
    };
    put();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mount canvas snapshot ke dalam pill
  useLensCanvas(lensSlotRef);

  const linkBase =
    "relative z-10 rounded-xl px-3 py-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";

  // Semakin cepat perpindahan, makin “cair”
  const squish = Math.min(0.28, Math.abs(dx) / 160);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        {/* Shell super bening: NO blur, NO tint */}
        <div
          ref={shellRef}
          className="rounded-2xl border border-white/60 bg-transparent dark:border-white/15"
          style={{
            position: "relative",
            overflow: "hidden",
            boxShadow: "inset 0 0 0.8px rgba(255,255,255,0.9), 0 10px 18px rgba(0,0,0,0.06)",
          }}
        >
          <nav className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
                RE
              </span>
            </Link>

            <ul ref={listRef} className="relative flex items-center gap-2 text-sm">
              {/* LIQUID PILL: ring bening + LENS tajam (refraksi ringan) */}
              <m.span
                key="liquid-pill"
                className="absolute -z-0"
                initial={false}
                animate={{
                  left: pill.left,
                  top: pill.top,
                  width: pill.width,
                  height: pill.height,
                  scaleX: 1 + squish,
                  scaleY: 1 - squish / 2,
                  borderRadius: 999,
                }}
                transition={{ type: "spring", stiffness: 950, damping: 20, mass: 0.5 }}
                style={{
                  background: "transparent",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.95), 0 8px 16px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                {/* Slot tempat <canvas> snapshot dimount oleh hook */}
                <span
                  ref={lensSlotRef}
                  className="pointer-events-none block h-full w-full"
                  style={{
                    borderRadius: 999,
                    // Kurva kaca: pinggir sedikit gelap agar terasa menekuk
                    WebkitMask:
                      "radial-gradient(120% 160% at 50% 50%, #000 62%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0.0) 100%)",
                    mask:
                      "radial-gradient(120% 160% at 50% 50%, #000 62%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0.0) 100%)",
                  }}
                />
              </m.span>

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
                    className={`${linkBase} ${activeLabel === l.label ? "text-slate-900 dark:text-white" : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Styling global tipis agar lensa terasa “air” (tanpa blur) */}
      <style jsx global>{`
        /* Geser keseluruhan canvas sesuai scroll */
        .lens-canvas {
          transform:
            translate(var(--bg-x), var(--bg-y))
            scale(calc(1.015 + min(0.015, (abs(var(--dx, 0)) / 1200))))
            skewX(calc(var(--dx, 0) / 520));
          transform-origin: center;
          filter: contrast(1.06) brightness(1.04) saturate(1.02);
        }
      `}</style>
    </header>
  );
}
