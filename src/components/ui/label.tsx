"use client";
export function Label({children, htmlFor} : {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (<label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
    {children}
  </label>);
}
