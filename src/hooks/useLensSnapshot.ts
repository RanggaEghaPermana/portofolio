// FILE: src/hooks/useLensSnapshot.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ambil snapshot halaman sebagai dataURL (tanpa blur).
 * Sinkron dengan scroll agar isi “di bawah” lensa terlihat tajam dan sesuai.
 * Aman untuk SSR (lazy import html2canvas di client).
 */
export function useLensSnapshot() {
  const [img, setImg] = useState<string | null>(null);
  const busy = useRef(false);

  async function snap() {
    if (busy.current) return;
    busy.current = true;
    try {
      const mod = await import("html2canvas").catch(() => null as any);
      const html2canvas = mod?.default;
      if (!html2canvas || typeof window === "undefined") {
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
    }
  }

  useEffect(() => {
    snap(); // pertama
    let raf: number | null = null;
    let t: any;

    const debounced = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        clearTimeout(t);
        t = setTimeout(() => snap(), 150);
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
