// FILE: src/hooks/useLensSnapshot.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mengambil "cuplikan" halaman (viewport/body) sebagai dataURL untuk dipakai
 * sebagai background di dalam kapsul (tanpa blur). Diselaraskan dengan scroll.
 *
 * Catatan:
 *  - Lazy import 'html2canvas'. Jika belum terpasang, fallback => null (tetap jalan).
 *  - Snapshot saat mount + dibounce saat scroll/resize (tidak berat).
 */
export function useLensSnapshot() {
  const [img, setImg] = useState<string | null>(null);
  const busy = useRef(false);
  const last = useRef(0);

  async function snap() {
    if (busy.current) return;
    busy.current = true;
    try {
      const mod = await import("html2canvas").catch(() => null as any);
      const html2canvas = mod?.default;
      if (!html2canvas || typeof window === "undefined" || !document.body) {
        setImg(null);
        return;
      }
      const canvas = await html2canvas(document.body, {
        backgroundColor: null,
        useCORS: true,
        logging: false,
        scale: Math.min(1.25, Math.max(1, window.devicePixelRatio || 1)),
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      setImg(canvas.toDataURL("image/png", 0.85));
    } finally {
      busy.current = false;
      last.current = Date.now();
    }
  }

  useEffect(() => {
    snap(); // initial
    let raf: number | null = null;
    let t: any;

    const debounced = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        clearTimeout(t);
        t = setTimeout(() => {
          // re-snap setelah user berhenti scroll/resize 180ms
          snap();
        }, 180);
      });
    };

    window.addEventListener("scroll", debounced, { passive: true });
    window.addEventListener("resize", debounced);
    window.addEventListener("orientationchange", debounced);

    return () => {
      window.removeEventListener("scroll", debounced as any);
      window.removeEventListener("resize", debounced as any);
      window.removeEventListener("orientationchange", debounced as any);
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return img;
}
