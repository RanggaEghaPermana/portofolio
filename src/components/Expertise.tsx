// FILE: src/components/Expertise.tsx
'use client';

import { useMemo, useState } from 'react';
import { m, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { expertise, type Depth, type ExpertiseCategory, type ExpertiseItem } from '@/data/expertise';
import { Reveal } from '@/components/Reveal';

type ViewMode = 'grid' | 'list';
type FilterDepth = 'All' | Depth;

const DEPTHS: Depth[] = ['Dasar', 'Menengah', 'Lanjut'];

function depthColor(d: Depth) {
  switch (d) {
    case 'Lanjut':
      return 'border-emerald-300/60 bg-emerald-50 text-emerald-700 dark:border-emerald-600/60 dark:bg-emerald-900/30 dark:text-emerald-200';
    case 'Menengah':
      return 'border-indigo-300/60 bg-indigo-50 text-indigo-700 dark:border-indigo-600/60 dark:bg-indigo-900/30 dark:text-indigo-200';
    default:
      return 'border-slate-300/60 bg-slate-50 text-slate-700 dark:border-slate-600/60 dark:bg-slate-900/30 dark:text-slate-200';
  }
}

function depthPercent(d: Depth) {
  return d === 'Dasar' ? 34 : d === 'Menengah' ? 67 : 100;
}

/** Donut ring dengan chip % agar kontras di light/dark */
function LevelRing({ depth }: { depth: Depth }) {
  const p = depthPercent(depth);
  const angle = Math.round((p / 100) * 360);
  const trackLight = 'rgba(0,0,0,0.10)';
  const trackDark = 'rgba(255,255,255,0.18)';
  const conic = `conic-gradient(currentColor ${angle}deg, ${trackLight} ${angle}deg 360deg)`;

  return (
    <div className="relative inline-grid h-10 w-10 place-items-center text-slate-900 dark:text-white" aria-label={`Level ${depth}`}>
      <div className="h-10 w-10 rounded-full" style={{ background: conic }} />
      <div className="absolute h-6 w-6 rounded-full bg-white dark:bg-slate-950" />
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="rounded px-1 text-[10px] font-semibold leading-none text-slate-900 shadow-sm ring-1 ring-black/5 dark:bg-slate-900/80 dark:text-white dark:ring-white/10 bg-white/90">
          {p}%
        </span>
      </div>
      <style jsx>{`
        @media (prefers-color-scheme: dark) {
          div[aria-label^="Level"] > div:first-child {
            background: conic-gradient(currentColor ${angle}deg, ${trackDark} ${angle}deg 360deg);
          }
        }
      `}</style>
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
  const before = text.slice(0, idx);
  const hit = text.slice(idx, idx + term.length);
  const after = text.slice(idx + term.length);
  return (
    <>
      {before}
      <mark className="bg-yellow-200/70 px-0.5 dark:bg-amber-400/30">{hit}</mark>
      {after}
    </>
  );
}

export default function Expertise() {
  const [view, setView] = useState<ViewMode>('grid');
  const [query, setQuery] = useState('');
  const [filterDepth, setFilterDepth] = useState<FilterDepth>('All');
  const reduce = useReducedMotion();

  // Flatten & helper
  const flat = useMemo(() => {
    const res: { cat: string; it: ExpertiseItem }[] = [];
    for (const c of expertise) for (const it of c.items) res.push({ cat: c.title, it });
    return res;
  }, []);

  const match = (it: ExpertiseItem) => {
    const q = query.trim().toLowerCase();
    const passDepth = filterDepth === 'All' ? true : it.depth === filterDepth;
    if (!q) return passDepth;
    const hay = (s: string | undefined) => (s ?? '').toLowerCase();
    const inName = hay(it.name).includes(q);
    const inBullets = it.bullets?.some((b) => hay(b).includes(q));
    const inTools = it.tools?.some((t) => hay(t).includes(q));
    return passDepth && (inName || inBullets || inTools);
  };

  const filtered = useMemo<ExpertiseCategory[]>(() => {
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

  // Jarak dari navbar sedikit dirapatkan (dari pt-24 → pt-12/md:pt-14)
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-12 md:pt-14">
      <Reveal>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">Kompetensi</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                view === 'grid'
                  ? 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
              aria-pressed={view === 'grid'}
              title="Tampilan Grid"
            >
              <Grid3X3 className="h-4 w-4" /> Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${
                view === 'list'
                  ? 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
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
              placeholder="Cari kompetensi, tools, atau poin pengalaman..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 outline-none ring-2 ring-transparent transition focus:border-slate-300 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-600 dark:focus:ring-slate-800"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/60 bg-white p-3 text-sm dark:border-slate-800/60 dark:bg-slate-900">
          <span className="mb-2 inline-flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200">
            <SlidersHorizontal className="h-4 w-4" />
            Filter tingkat
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterDepth('All')}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                filterDepth === 'All'
                  ? 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                  : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              Semua
            </button>
            {DEPTHS.map((d) => (
              <button
                key={d}
                onClick={() => setFilterDepth(d)}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  filterDepth === d
                    ? 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'
                    : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
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
              transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            >
              <Reveal delay={i * 0.04}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{cat.title}</h3>
                </div>
              </Reveal>

              {view === 'grid' ? (
                <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((it) => (
                    <m.article
                      key={it.name}
                      layout
                      whileHover={reduce ? undefined : { y: -3 }}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 dark:ring-white/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="truncate font-medium">{highlight(it.name, query)}</h4>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <DepthBadge d={it.depth} />
                            {it.tools?.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400"
                              >
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
                <div className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/60">
                  {cat.items.map((it) => (
                    <details key={it.name} className="group">
                      <summary className="flex cursor-pointer items-start justify-between gap-3 px-4 py-3">
                        <div className="min-w-0">
                          <div className="font-medium">{highlight(it.name, query)}</div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <DepthBadge d={it.depth} />
                            {it.tools?.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400"
                              >
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
                          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                            Terkait:{" "}
                            {it.related.map((r, idx) => (
                              <span key={r}>
                                {r}
                                {idx < (it.related?.length ?? 0) - 1 ? ", " : ""}
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

      <div className="mt-10 rounded-xl border border-amber-300/50 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700/50 dark:bg-amber-900/30 dark:text-amber-100">
        Catatan: aktivitas pentest selalu dilakukan <strong>dengan izin</strong> dan pada lingkungan yang tepat (staging/sandbox).
      </div>
    </section>
  );
}
