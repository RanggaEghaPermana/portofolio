"use client";
import * as React from "react";
export const Textarea = React.forwardRef < HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> > (({
    className = "",
    ...props
  }, ref) => (<textarea ref={ref} className={`min-h-[120px] w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`} {...props}/>));
Textarea.displayName = "Textarea";
