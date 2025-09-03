// FILE: src/components/Expertise.tsx
'use client';

import { useMemo, useState } from 'react';
import { m, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { expertise, type Depth, type ExpertiseCategory, type ExpertiseItem } from '@/data/expertise';
import { Reveal } from '@/components/Reveal';

type ViewMode = 'grid' | 'list';

const DEPTHS: Depth[] = ['Dasar', 'Menengah', 'Lanjut'];

function depthColor(d: Depth) {
  switch (d) {
    case 'Lanjut':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300/50 dark:bg-emerald-800/60 dark:text-emerald-100 dark:border-emerald-700/50';
    case 'Menengah':
      return 'bg-indigo-100 text-indigo-800 border-indigo-300/50 dark:bg-indigo-800/60 dark:text-indigo-100 dark:border-indigo-700/50';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-300/50 dark:bg-slate-800/60 dark:text-slate-100 dark:border-slate-700/50';
  }
}

function depthPercent(d: Depth) {
  return d === 'Dasar' ? 34 : d === 'Menengah' ? 67 : 100;
}

function LevelRing({ depth }: { depth: Depth }) {
  const p = depthPercent(depth);
  const angle = Math.round((p / 100) * 360);
  const conic = `conic-gradient(currentColor ${angle}deg, rgba(0,0,0,0.08) ${angle}deg 360deg)`;
  return (
    <div className="relative inline-grid place-items-center text-slate-900 dark:text-white" aria-label={`Level ${depth}`}>
      <div className="h-8 w-8 rounded-full" style={{ background: conic }} />
      <div className="absolute text-[10px] font-semibold">{p}%</div>
    </div>
  );
}

function DepthBadge({ d }: { d: Depth }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${depthColor(d)}`}>
      {d}
    </span>
  );
}

function highlight(text: string, term: string) {
  if (!term) return text;
  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded px-0.5 py-[1px] bg-yellow-200/70 dark:bg-yellow-500/30">{text.slice(idx, idx + term.length)}</mark>
      {text.slice(idx + term.length)}
    </>
  );
}

export default function Expertise() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState('');
  const [filterDepth, setFilterDepth] = useState<Depth | 'All'>('All');
  const [view, setView] = useState<ViewMode>('grid');

  const flat = useMemo(() => {
    return expertise.flatMap(cat => cat.items.map(it => ({ cat: cat.title, it })));
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const match = (it: ExpertiseItem) =>
      (!term ||
        it.name.toLowerCase().includes(term) ||
        it.bullets.some(b => b.toLowerCase().includes(term)) ||
        it.tools?.some(t => t.toLowerCase().includes(term)) ||
        it.related?.some(r => r.toLowerCase().includes(term))) &&
      (filterDepth === 'All' || it.depth === filterDepth);

    const groups: ExpertiseCategory[] = [];
    for (const cat of expertise) {
      const items = cat.items.filter(match);
      if (items.length) groups.push({ title: cat.title, items });
    }
    return groups;
  }, [query, filterDepth]);

  const countsByDepth = useMemo(() => {
    const counts = { Dasar: 0, Menengah: 0, Lanjut: 0 } as Record<Depth, number>;
    for (const { it } of flat) counts[it.depth] += 1;
    return counts;
  }, [flat]);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-24">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">Kompetensi</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm ${view === 'grid' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              aria-pressed={view === 'grid'}
              title="Tampilan Grid"
            >
              <Grid3X3 className="h-4 w-4" /> Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm ${view === 'list' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              aria-pressed={view === 'list'}
              title="Tampilan Daftar"
            >
              <List className="h-4 w-4" /> List
            </button>
          </div>
        </div>
      </Reveal>

      {/* Controls */}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari skill, tools, atau keyword…"
              className="w-full rounded-xl border border-slate-300 bg-white px-9 py-2.5 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white/90 dark:border-slate-700 dark:bg-slate-900 dark:focus:border-slate-600"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <SlidersHorizontal className="h-4 w-4" />
            Filter tingkat
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterDepth('All')}
              className={`rounded-full border px-3 py-1.5 text-xs ${filterDepth === 'All' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              Semua
            </button>
            {DEPTHS.map(d => (
              <button
                key={d}
                onClick={() => setFilterDepth(d)}
                className={`rounded-full border px-3 py-1.5 text-xs ${filterDepth === d ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                {d} <span className="ml-1 text-[10px] text-slate-500">({countsByDepth[d]})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 space-y-10">
        <AnimatePresence initial={false} mode="popLayout">
          {filtered.map((cat, i) => (
            <m.section
              key={cat.title}
              layout
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35, ease: 'easeOut', delay: i * 0.02 }}
              className="will-change-[opacity,transform] transform-gpu"
            >
              <Reveal delay={i * 0.04}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{cat.title}</h3>
                </div>
              </Reveal>

              {view === 'grid' ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((it) => (
                    <m.article
                      key={it.name}
                      layout
                      whileHover={reduce ? undefined : { y: -3 }}
                      className="group rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm ring-1 ring-transparent transition-[box-shadow,transform] will-change-[transform] hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="truncate font-medium">
                            {highlight(it.name, query)}
                          </h4>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <DepthBadge d={it.depth} />
                            {it.tools?.slice(0, 3).map(t => (
                              <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                {highlight(t, query)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <LevelRing depth={it.depth} />
                      </div>

                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                        {it.bullets.slice(0, 3).map((b) => (
                          <li key={b}>{highlight(b, query)}</li>
                        ))}
                      </ul>
                    </m.article>
                  ))}
                </div>
              ) : (
                <div className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
                  {cat.items.map((it) => (
                    <details key={it.name} className="group open:bg-slate-50/40 dark:open:bg-slate-800/30">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3">
                        <div className="min-w-0">
                          <h4 className="truncate font-medium">
                            {highlight(it.name, query)}
                          </h4>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <DepthBadge d={it.depth} />
                            {it.tools?.slice(0, 4).map(t => (
                              <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                {highlight(t, query)}
                              </span>
                            ))}
                          </div>
                        </div>
                        <LevelRing depth={it.depth} />
                      </summary>
                      <div className="px-4 pb-4 text-sm text-slate-700 dark:text-slate-300">
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {it.bullets.map((b) => (
                            <li key={b}>{highlight(b, query)}</li>
                          ))}
                        </ul>
                        {it.related?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {it.related.map(r => (
                              <span key={r} className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                {highlight(r, query)}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </m.section>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-10 rounded-xl border border-amber-300/50 bg-amber-50 p-4 text-amber-800 dark:border-amber-700/50 dark:bg-amber-900/30 dark:text-amber-100">
        Catatan: aktivitas pentest selalu dilakukan <strong>dengan izin</strong> dan pada lingkungan yang tepat (staging/sandbox).
      </div>
    </section>
  );
}
