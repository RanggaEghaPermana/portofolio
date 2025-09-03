// FILE: src/components/Nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

  // state aktif + hover
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string>("Home");

  // sinkronkan aktif berdasar path/hash (tanpa observer, biar stabil)
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

  // --- LIQUID PILL MEASURING (tanpa blur) ---
  const listRef = useRef<HTMLUListElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const currentLabel = hovered ?? activeLabel ?? navLinks[0].label;

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

    // titik pusat pill (untuk highlight shell seadanya; masih transparan)
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

  const linkBase =
    "relative z-10 rounded-xl px-3 py-2 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100";

  const squish = Math.min(0.28, Math.abs(dx) / 160);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        {/* Shell super bening: NO blur, NO tint */}
        <div
          ref={shellRef}
          className="rounded-2xl border border-white/60 bg-transparent dark:border-white/15"
          style={{
            boxShadow:
              "inset 0 0 0.8px rgba(255,255,255,0.9), 0 10px 18px rgba(0,0,0,0.06)",
          }}
        >
          <nav className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
                RE
              </span>
            </Link>

            <ul ref={listRef} className="relative flex items-center gap-2 text-sm">
              {/* PILL cair: murni transparan, cuma ring & highlight (tanpa blur) */}
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
                  borderRadius: 14,
                }}
                transition={{ type: "spring", stiffness: 950, damping: 20, mass: 0.5 }}
                style={{
                  // ring putih + inner highlight — tidak menutup isi di bawahnya
                  background: "transparent",
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.95), 0 8px 16px rgba(0,0,0,0.06)",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "destination-out" as any, // menjaga ring tetap mulus
                }}
              />
              {/* Highlight tipis yang mengikuti posisi pill (tanpa menutupi) */}
              <m.span
                aria-hidden
                className="pointer-events-none absolute -z-10"
                initial={false}
                animate={{
                  left: Math.max(0, pill.left - 40),
                  top: Math.max(0, pill.top - 10),
                  width: pill.width + 80,
                  height: pill.height + 20,
                  borderRadius: 999,
                  opacity: 0.55,
                }}
                transition={{ type: "tween", duration: 0.25 }}
                style={{
                  background:
                    "radial-gradient(120% 160% at 50% 15%, rgba(255,255,255,0.35), rgba(255,255,255,0) 48%)",
                  mixBlendMode: "screen",
                }}
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
                      activeLabel === l.label ? "text-slate-900 dark:text-white" : ""
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

      {/* Tambahan styling global super tipis agar tetap terasa 'kaca' tapi transparan */}
      <style jsx global>{`
        /* garis highlight samar di shell — tetap tidak menutup konten */
        .rounded-2xl::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          pointer-events: none;
          background: radial-gradient(
            120% 200% at var(--pill-cx, 50%) 6%,
            rgba(255, 255, 255, 0.12),
            transparent 45%
          );
          mix-blend-mode: screen;
          opacity: 0.7;
        }
      `}</style>
    </header>
  );
}
