'use client';
import { useState } from 'react';
import { expertise, type Depth } from '@/data/expertise';
import { Reveal } from '@/components/Reveal';

function depthClass(d: Depth) {
  if (d === 'Lanjut') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100 border-emerald-300/50 dark:border-emerald-700/50';
  if (d === 'Menengah') return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-100 border-indigo-300/50 dark:border-indigo-700/50';
  return 'bg-slate-100 text-slate-800 dark:bg-slate-800/60 dark:text-slate-100 border-slate-300/50 dark:border-slate-700/50';
}

export default function Expertise() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal><h2 className="text-2xl font-semibold">Kompetensi Mendalam</h2></Reveal>
      <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">
        Ringkasan area yang saya kuasai beserta praktik yang biasa digunakan untuk keamanan dan performa.
      </p>

      <div className="mt-6 space-y-6">
        {expertise.map((cat, i) => {
          const isOpen = openIdx === i;
          return (
            <Reveal key={cat.title} delay={i * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold">{cat.title}</span>
                  <span className="text-sm text-slate-500">{isOpen ? 'Tutup' : 'Lihat detil'}</span>
                </button>

                <div className={`grid grid-cols-1 gap-5 px-5 pb-5 transition-[grid-template-rows] ${isOpen ? '' : 'hidden'}`}>
                  {cat.items.map((it) => (
                    <div key={it.name} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium">{it.name}</h3>
                        <span className={`rounded-full border px-2 py-0.5 text-xs ${depthClass(it.depth)}`}>{it.depth}</span>
                      </div>
                      {it.bullets?.length ? (
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600 dark:text-slate-300">
                          {it.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                        </ul>
                      ) : null}
                      {(it.tools?.length || it.related?.length) ? (
                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          {it.tools?.map((t) => (
                            <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-700">🔧 {t}</span>
                          ))}
                          {it.related?.map((r) => (
                            <span key={r} className="rounded-full border border-slate-200 px-2 py-0.5 dark:border-slate-700">🔎 {r}</span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-amber-300/50 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700/50 dark:bg-amber-900/30 dark:text-amber-100">
        Catatan: aktivitas pentest selalu dilakukan <strong>dengan izin</strong> dan pada lingkungan yang tepat (staging/sandbox).
      </div>
    </section>
  );
}
