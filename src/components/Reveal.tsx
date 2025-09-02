"use client";
import {m, useReducedMotion} from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  y = 24
} : {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (<m.div initial={{
      opacity: 0,
      y: reduce
        ? 0
        : y
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true,
      amount: 0.2
    }} transition={{
      duration: 0.6,
      ease: "easeOut",
      delay
    }}>
    {children}
  </m.div>);
}
