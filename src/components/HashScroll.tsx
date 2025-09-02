"use client";

import {useEffect} from "react";
import {usePathname, useSearchParams} from "next/navigation";

export default function HashScroll({
  offset = 88
} : {
  offset?: number
}) {
  const pathname = usePathname();
  const search = useSearchParams();

  const scrollToHash = () => {
    const hash = window.location.hash;
    if (!hash) 
      return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (!el) 
      return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top, behavior: "smooth"});
  };

  useEffect(() => {
    scrollToHash();
    const onHash = () => scrollToHash();
    window.addEventListener("hashchange", onHash);
    return() => window.removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search, offset]);

  return null;
}
