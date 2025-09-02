"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect
} from "react";
import {createPortal} from "react-dom";

type ToastItem = {
  id: number;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "info";
  duration?: number;
};

const ToastCtx = createContext < {
  show: (t : Omit<ToastItem, "id">) => void;
} | null > (null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) 
    throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({children} : {
  children: React.ReactNode
}) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const show = useCallback((t : Omit<ToastItem, "id">) => {
    const id = Date.now() + Math.random();
    const item: ToastItem = {
      id,
      duration: 3000,
      variant: "info",
      ...t
    };
    setItems((prev) => [
      ...prev,
      item
    ]);
    setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== id)), item.duration);
  }, []);

  const value = useMemo(() => ({show}), [show]);

  return (<ToastCtx.Provider value={value}>
    {children}
    {
      mounted
        ? createPortal(<div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-full max-w-sm flex-col gap-3">
          {
            items.map((t) => (<div key={t.id} className={`pointer-events-auto rounded-xl border p-4 shadow-lg backdrop-blur-sm ${
              t.variant === "success"
                ? "border-emerald-300/60 bg-emerald-50/70 text-emerald-900 dark:border-emerald-700/60 dark:bg-emerald-900/50 dark:text-emerald-100"
                : t.variant === "error"
                  ? "border-rose-300/60 bg-rose-50/70 text-rose-900 dark:border-rose-700/60 dark:bg-rose-900/50 dark:text-rose-100"
                  : "border-slate-300/60 bg-white/70 text-slate-900 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-100"}`}>
              {
                t.title
                  ? (<div className="text-sm font-semibold">{t.title}</div>)
                  : null
              }
              {
                t.description
                  ? (<div className="mt-1 text-sm opacity-90">
                    {t.description}
                  </div>)
                  : null
              }
            </div>))
          }
        </div>, document.body)
        : null
    }
  </ToastCtx.Provider>);
}
