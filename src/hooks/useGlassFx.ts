// FILE: src/hooks/useGlassFx.ts
"use client";

import {MutableRefObject, useEffect, useRef} from "react";

/**
 * Memompa variabel CSS untuk efek kaca:
 *  --glass-gx : posisi glare X (di-update juga dari Nav saat pill pindah)
 *  --glass-vel: respons kecepatan scroll → efek “pantulan” halus
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
      // low-pass filter → gerak lembut
      vel.current = vel.current * 0.86 + dy * 0.14;
      if (raf) 
        cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const v = Math.max(-30, Math.min(30, vel.current));
        el.style.setProperty("--glass-vel", (v / 10).toFixed(2));
      });
    };

    window.addEventListener("scroll", onScroll, {passive: true});
    return() => {
      window.removeEventListener("scroll", onScroll);
      if (raf) 
        cancelAnimationFrame(raf);
      };
  }, [ref]);
}
