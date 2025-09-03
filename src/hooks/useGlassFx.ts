// FILE: src/hooks/useGlassFx.ts
"use client";

import {MutableRefObject, useEffect, useRef} from "react";

/**
 * Variabel CSS untuk efek kaca:
 *  --glass-gx : posisi glare X (mouse & pusat pill)
 *  --glass-vel: kecepatan scroll (tersedia bila mau dipakai lagi)
 */
export function useGlassFx(ref : MutableRefObject < HTMLElement | null >) {
  const lastY = useRef<number>(0);
  const vel = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) 
      return;
    
    el.style.setProperty("--glass-gx", "50%");
    el.style.setProperty("--glass-vel", "0");

    let raf: number | null = null;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      vel.current = vel.current * 0.86 + dy * 0.14;
      if (raf) 
        cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const v = Math.max(-30, Math.min(30, vel.current));
        el.style.setProperty("--glass-vel", (v / 10).toFixed(2));
      });
    };

    const onMouse = (e : MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(r.width, 1);
      const gx = Math.min(0.98, Math.max(0.02, x));
      el.style.setProperty("--glass-gx", `${ (gx * 100).toFixed(2)}%`);
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    el.addEventListener("mousemove", onMouse);

    return() => {
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("mousemove", onMouse);
      if (raf) 
        cancelAnimationFrame(raf);
      };
  }, [ref]);
}
