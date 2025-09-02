"use client";
import {useRef} from "react";

export function TiltCard({
  children,
  max = 12
} : {
  children: React.ReactNode;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e : React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current !;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * (max * 2);
    const ry = (0.5 - px) * (max * 2);
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  return (<div ref={ref} onMouseMove={onMove} onMouseLeave={() => (ref.current !.style.transform = "")} className="will-change-transform transition-transform duration-150" style={{
      transformStyle: "preserve-3d"
    }}>
    {children}
  </div>);
}
