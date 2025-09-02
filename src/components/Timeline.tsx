"use client";
import {experiences} from "@/data/experiences";
import {Reveal} from "@/components/Reveal";

export default function TimelineSection() {
  return (<section id="experience" className="mx-auto max-w-4xl px-6 pb-24">
    <Reveal>
      <h2 className="text-2xl font-semibold">Pengalaman</h2>
    </Reveal>

    <div className="relative mt-8">
      <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700"/>
      <ul className="space-y-8">
        {
          experiences.map((e, i) => (<Reveal key={e.title + i} delay={i * 0.06}>
            <li className="relative pl-12">
              <span className="absolute left-[7px] top-2 h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-indigo-600/20"/>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {e.period}
                </div>
                <h3 className="mt-1 font-semibold">{e.title}</h3>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {e.org}
                </div>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                  {e.desc}
                </p>
              </div>
            </li>
          </Reveal>))
        }
      </ul>
    </div>
  </section>);
}
