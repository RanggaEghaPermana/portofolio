// FILE: src/app/template.tsx
"use client";
import {LazyMotion, domAnimation, m} from "framer-motion";
import {usePathname} from "next/navigation";
import {useReducedMotion} from "framer-motion";

export default function Template({children} : {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const initial = reduce
    ? {
      opacity: 1,
      y: 0
    }
    : {
      opacity: 0,
      y: 8
    };
  const animate = {
    opacity: 1,
    y: 0
  };
  const transition = reduce
    ? {
      duration: 0
    }
    : {
      duration: 0.35,
      ease: "easeOut"
    };

  return (<LazyMotion features={domAnimation}>
    <m.main key={pathname} initial={initial} animate={animate} transition={transition} className="min-h-screen will-change-[opacity,transform] transform-gpu">
      {children}
    </m.main>
  </LazyMotion>);
}
