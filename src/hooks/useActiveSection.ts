// FILE: src/hooks/useActiveSection.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Melacak ID section yang sedang dominan di viewport pada halaman "/".
 * Aman dipanggil di halaman apa pun: kalau elemen tidak ada, hook ini no-op.
 */
export function useActiveSection(
  ids: string[],
  // Sesuaikan dengan tinggi navbar/sticky; angka minus di atas supaya "aktif" lebih cepat pindah saat mendekati section baru.
  rootMargin = "-88px 0px -55% 0px",
) {
  const [active, setActive] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return; // halaman non-home → no-op

    // Inisialisasi cepat: pilih 'home' bila ada, biar tidak nyangkut di state sebelumnya.
    const homeEl = document.getElementById("home");
    if (homeEl) setActive("home");

    // Fallback rAF (kadang IO telat update saat hash/scroll sangat cepat)
    const updateByPosition = () => {
      const midline = window.innerHeight * 0.28; // garis acuan ~ 28% dari atas viewport
      let best: { id: string; score: number } | null = null;
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        // skor makin kecil makin dekat ke garis acuan (prioritaskan yang di atas tapi dekat midline)
        const score = Math.abs(rect.top - midline);
        if (!best || score < best.score) best = { id: el.id, score };
      }
      if (best) setActive(best.id);
    };

    // Observer utama
    const obs = new IntersectionObserver(
      (entries) => {
        // Ambil entry yang paling besar rasio tampilnya
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin, threshold: [0.12, 0.25, 0.5, 0.75] },
    );

    sections.forEach((el) => obs.observe(el));

    // Dengarkan hashchange supaya klik anchor langsung memicu update
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id && ids.includes(id)) {
        // delay 1 frame agar layout settle setelah scroll
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => setActive(id));
      }
    };

    window.addEventListener("hashchange", onHash);
    // Sync awal bila datang dari navigasi cepat
    updateByPosition();

    return () => {
      obs.disconnect();
      window.removeEventListener("hashchange", onHash);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ids.join(","), rootMargin]);

  return active;
}
