// FILE: src/components/TiltCard.tsx
"use client";
import {useRef, useEffect} from "react";
import {useReducedMotion} from "framer-motion";

export function TiltCard({
  children,
  max = 12
} : {
  children: React.ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  let frame = 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) 
      return;
    
    // Disable on touch devices & when reduced motion is requested
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || isCoarse) {
      el.style.transform = "none";
      return;
    }

    const onMove = (e : MouseEvent) => {
      if (frame) 
        return;
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (py - 0.5) * (max * 2);
        const ry = (0.5 - px) * (max * 2);
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        frame = 0;
      });
    };

    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (frame) 
        cancelAnimationFrame(frame);
      };
  }, [reduce, max]);

  return (<div ref={ref} className="will-change-transform transform-gpu transition-transform duration-150" style={{
      transformStyle: "preserve-3d"
    }}>
    {children}
  </div>);
}
