"use client";
import * as React from "react";
export const Input = React.forwardRef < HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> > (({
    className = "",
    ...props
  }, ref) => (<input ref={ref} className={`h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`} {...props}/>));
Input.displayName = "Input";
