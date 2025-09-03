// FILE: src/components/Reveal.tsx
"use client";
import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className="will-change-[transform,opacity] transform-gpu"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -20% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </m.div>
  );
}
