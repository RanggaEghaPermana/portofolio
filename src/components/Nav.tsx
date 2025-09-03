// FILE: src/components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLensSnapshot } from "@/hooks/useLensSnapshot";

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

  // hover & active (aktif rute + hash home)
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

  // ===================== LIQUID PILL MEASURING =====================
  const listRef = useRef<HTMLUListElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
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

    // metrik buat lens/caustics
    const cx = next.left + next.width / 2;
    const cy = next.top + next.height / 2;
    shellRef.current?.style.setProperty("--pill-cx", `${cx.toFixed(2)}px`);
    shellRef.current?.style.setProperty("--pill-cy", `${cy.toFixed(2)}px`);
    shellRef.current?.style.setProperty("--hole-rx", `${(next.width * 0.62).toFixed(2)}px`);
    shellRef.current?.style.setProperty("--hole-ry", `${(next.height * 0.90).toFixed(2)}px`);
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

  // track scroll → selaraskan posisi gambar snapshot (biar “tembus” beneran)
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
    const onResize = onScroll;

    put();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const linkBase =
    "relative z-10 rounded-xl px-3 py-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";

  const squish = Math.min(0.28, Math.abs(dx) / 160); // makin cepat, makin cair
  const lensImg = useLensSnapshot();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        {/* Shell transparan total (tidak ada blur), cuma border & highlight tipis */}
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
              {/* LIQUID PILL: ring bening + “lensa” tajam di dalam (no blur) */}
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
                {/* Layer refraksi (tajam), efek tergantung konten yang dilewati */}
                {lensImg && (
                  <span
                    className="pointer-events-none block h-full w-full"
                    style={{
                      borderRadius: 999,
                      backgroundImage: `url(${lensImg})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "var(--bg-w) var(--bg-h)",
                      backgroundPosition: "var(--bg-x) var(--bg-y)",
                      // Pembiasan ringan → beri magnify & sedikit shear sesuai arah gerak
                      transform: `scale(${1.015 + Math.min(0.015, Math.abs(dx) / 1200)}) skewX(${(dx / 520).toFixed(3)}rad)`,
                      // “kurva kaca” – bagian pinggir sedikit gelap agar terlihat menekuk
                      WebkitMask:
                        "radial-gradient(120% 160% at 50% 50%, #000 62%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0.0) 100%)",
                      mask:
                        "radial-gradient(120% 160% at 50% 50%, #000 62%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0.0) 100%)",
                      // highlight tipis atas
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
                      // sedikit kontras biar “mirror” terasa (tanpa blur)
                      filter: "contrast(1.06) brightness(1.04) saturate(1.02)",
                      mixBlendMode: "normal",
                    }}
                  />
                )}
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
    </header>
  );
}
