// FILE: src/hooks/useActiveSection.ts
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Melacak ID section dominan di viewport (highlight anchor nav).
 * Reset otomatis saat bukan di "/" agar highlight tidak nyangkut.
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

    const boot = () => {
      if (cancelled) return;

      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el);

      if (!sections.length) {
        rafRef.current = requestAnimationFrame(boot);
        return;
      }

      if (ids.includes("home") && document.getElementById("home")) {
        setActive("home");
      }

      const obs = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target?.id) setActive(visible.target.id);
        },
        { root: null, rootMargin, threshold: [0.12, 0.25, 0.5, 0.75] }
      );

      obsRef.current = obs;
      sections.forEach((el) => obs.observe(el));
    };

    boot();

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (obsRef.current) {
        obsRef.current.disconnect();
        obsRef.current = null;
      }
    };
  }, [enabled, ids.join(","), rootMargin]);

  return active;
}
