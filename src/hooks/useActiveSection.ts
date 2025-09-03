// FILE: src/hooks/useActiveSection.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Melacak ID section yang dominan di viewport (untuk highlight nav anchor).
 * Aman dipakai di halaman mana pun:
 *  - Ketika enabled=false (bukan di "/") → state di-reset & tidak observe apa pun.
 *  - Ketika kembali ke "/" → re-init, nunggu elemen section muncul dulu.
 */
export function useActiveSection(
  ids: string[],
  opts?: { enabled?: boolean; rootMargin?: string }
) {
  const enabled = opts?.enabled ?? true;
  const rootMargin = opts?.rootMargin ?? "-88px 0px -55% 0px";

  const [active, setActive] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const obsRef = useRef<IntersectionObserver | null>(null);

  // Reset saat tidak aktif (mis. pindah ke /kompetensi)
  useEffect(() => {
    if (!enabled) {
      setActive(null);
      if (obsRef.current) {
        obsRef.current.disconnect();
        obsRef.current = null;
      }
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    const ensureSectionsAndObserve = () => {
      if (cancelled) return;

      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);

      // Tunggu sampai elemen section ter-mount (navigasi antar halaman bisa bikin timing mepet)
      if (!sections.length) {
        rafRef.current = requestAnimationFrame(ensureSectionsAndObserve);
        return;
      }

      // Mark awal sebagai 'home' bila ada (hindari highlight nyangkut)
      if (ids.includes("home") && document.getElementById("home")) {
        setActive("home");
      }

      const obs = new IntersectionObserver(
        (entries) => {
          // Ambil yang paling dominan
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target?.id) setActive(visible.target.id);
        },
        { root: null, rootMargin, threshold: [0.12, 0.25, 0.5, 0.75] }
      );

      obsRef.current = obs;
      sections.forEach((el) => obs.observe(el));

      // Hash click → set aktif segera setelah scroll
      const onHash = () => {
        const id = window.location.hash.slice(1);
        if (id && ids.includes(id)) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
          rafRef.current = requestAnimationFrame(() => setActive(id));
        }
      };
      window.addEventListener("hashchange", onHash);

      // Cleanup
      return () => {
        window.removeEventListener("hashchange", onHash);
      };
    };

    const cleanup = ensureSectionsAndObserve();

    return () => {
      cancelled = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (obsRef.current) {
        obsRef.current.disconnect();
        obsRef.current = null;
      }
      if (typeof cleanup === "function") cleanup();
    };
  }, [enabled, ids.join(","), rootMargin]);

  return active;
}
