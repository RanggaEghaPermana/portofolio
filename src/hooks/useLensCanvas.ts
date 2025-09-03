// FILE: src/hooks/useLensCanvas.ts
"use client";

import { useEffect, useRef } from "react";

/**
 * Render snapshot halaman sebagai <canvas> lalu mount ke containerRef.
 * Canvas diposisikan pakai CSS var --bg-x/--bg-y (sinkron dengan scroll).
 */
export function useLensCanvas(containerRef: React.MutableRefObject<HTMLElement | null>) {
  const pending = useRef<Promise<void> | null>(null);

  async function snapshot() {
    const el = containerRef.current;
    if (!el) return;
    const mod = await import("html2canvas").catch(() => null as any);
    const html2canvas = mod?.default;
    if (!html2canvas) return;

    // Ambil snapshot body
    const canvas = await html2canvas(document.body, {
      backgroundColor: null,
      useCORS: true,
      logging: false,
      scale: Math.min(1.25, Math.max(1, window.devicePixelRatio || 1)),
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
      // allowTaint membuat canvas bisa tampil walau tak bisa di-export
      allowTaint: true,
    });

    // Bersihkan canvas lama
    while (el.firstChild) el.removeChild(el.firstChild);

    // Styling canvas agar “isi di bawah” terlihat tepat di dalam pill
    canvas.style.position = "relative";
    canvas.style.width = `${document.documentElement.scrollWidth}px`;
    canvas.style.height = `${document.documentElement.scrollHeight}px`;
    canvas.style.left = "var(--bg-x)";
    canvas.style.top = "var(--bg-y)";
    canvas.style.willChange = "transform";
    canvas.className = "lens-canvas";
    el.appendChild(canvas);
  }

  useEffect(() => {
    const doSnap = () => {
      pending.current = snapshot();
    };
    doSnap();

    let raf: number | null = null;
    let t: number | null = null;

    const debounce = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (t) window.clearTimeout(t);
        t = window.setTimeout(() => doSnap(), 150);
      });
    };

    window.addEventListener("resize", debounce);
    window.addEventListener("orientationchange", debounce);
    // Saat scroll, kita tidak snap setiap frame—cukup geser posisi via CSS var
    return () => {
      window.removeEventListener("resize", debounce);
      window.removeEventListener("orientationchange", debounce);
      if (raf) cancelAnimationFrame(raf);
      if (t) window.clearTimeout(t);
    };
  }, [containerRef]);
}
