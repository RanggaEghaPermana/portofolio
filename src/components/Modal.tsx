"use client";
import {createPortal} from "react-dom";
import {useEffect} from "react";
import {LazyMotion, domAnimation, m} from "framer-motion";

export function Modal({open, onClose, title, children} : {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) 
      return;
    const onKey = (e : KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return() => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) 
    return null;
  return createPortal(<LazyMotion features={domAnimation}>
    <m.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
      <m.div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900" initial={{
          opacity: 0,
          y: 16,
          scale: 0.98
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} transition={{
          duration: 0.25,
          ease: "easeOut"
        }}>
        {
          title
            ? (<h3 className="mb-4 text-lg font-semibold">{title}</h3>)
            : null
        }
        {children}
        <button onClick={onClose} className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">
          Tutup
        </button>
      </m.div>
    </m.div>
  </LazyMotion>, document.body);
}
