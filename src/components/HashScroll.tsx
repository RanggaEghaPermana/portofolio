// FILE: src/components/HashScroll.tsx
"use client";

import {useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {useReducedMotion} from "framer-motion";

export default function HashScroll({
  offset = 88
} : {
  offset?: number
}) {
  const pathname = usePathname();
  const search = useSearchParams();
  const reduce = useReducedMotion();

  const scrollToHash = () => {
    const hash = window.location.hash;
    if (!hash) 
      return;
    const el = document.getElementById(hash.slice(1));
    if (!el) 
      return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top,
      behavior: reduce
        ? "auto"
        : "smooth"
    });
  };

  useEffect(() => {
    scrollToHash();
    const onHash = () => scrollToHash();
    window.addEventListener("hashchange", onHash);
    return() => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search, offset, reduce]);

  return null;
}
