// FILE: src/components/ui/progress.tsx
"use client";

export function Progress({value, ariaLabel} : {
  value: number;
  ariaLabel?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (<div role="progressbar" aria-label={ariaLabel} aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped} className="
        relative h-2.5 w-full overflow-hidden rounded-full
        border border-slate-200 bg-slate-100
        dark:border-slate-800 dark:bg-slate-800
      ">
    <div className="
          absolute inset-y-0 left-0 h-full
          bg-slate-900 dark:bg-white
          transition-[width] duration-700 ease-out
          will-change-[width] transform-gpu
        " style={{
        width: `${clamped}%`
      }}/>
  </div>);
}
