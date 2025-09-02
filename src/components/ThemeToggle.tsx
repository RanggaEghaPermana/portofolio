"use client";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("theme");
    const isDark = saved
      ? saved === "dark"
      : prefers;
    setDark(isDark);
    root.classList.toggle("dark", isDark);
  }, []);

  if (!mounted) 
    return null;
  
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(
      "theme", next
      ? "dark"
      : "light");
  };

  return (<button onClick={toggle} className="fixed bottom-6 left-6 z-40 inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800" aria-label="Toggle theme" title="Toggle theme">
    {
      dark
        ? "🌙"
        : "☀️"
    }
    <span className="ml-2 hidden sm:inline">{
        dark
          ? "Dark"
          : "Light"
      }</span>
  </button>);
}
