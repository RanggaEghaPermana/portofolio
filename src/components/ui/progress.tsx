"use client";
export function Progress({value} : {
  value: number
}) {
  return (<div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
    <div className="h-2 rounded-full bg-indigo-600 transition-[width] duration-500 ease-out" style={{
        width: `${Math.max(0, Math.min(100, value))}%`
      }}/>
  </div>);
}
