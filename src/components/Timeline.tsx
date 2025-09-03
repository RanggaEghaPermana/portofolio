// FILE: src/components/Timeline.tsx
"use client";
import {experiences} from "@/data/experiences";
import {Reveal} from "@/components/Reveal";

export default function TimelineSection() {
  return (<section id="experience" className="mx-auto max-w-4xl px-6 pb-24">
    <Reveal>
      <h2 className="text-2xl font-semibold">Pengalaman</h2>
    </Reveal>

    <div className="relative mt-8">
      {/* Garis vertikal (netral) */}
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700"/>

      <ul className="space-y-8">
        {
          experiences.map((e, i) => (<Reveal key={e.title + i} delay={i * 0.06}>
            <li className="relative pl-12">
              {/* Titik aksen (Indigo) */}
              <span className="absolute left-[9px] top-4 -translate-x-1/2 rounded-full bg-white p-1 ring-2 ring-indigo-600/25 dark:bg-slate-900" aria-hidden="aria-hidden">
                <span className="block h-3.5 w-3.5 rounded-full bg-indigo-600"/>
              </span>

              {/* Kartu konten */}
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {e.period}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {e.title}
                </h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {e.org}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {e.desc}
                </p>
              </article>
            </li>
          </Reveal>))
        }
      </ul>
    </div>
  </section>);
}
