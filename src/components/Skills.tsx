"use client";
import {skillGroups} from "@/data/skills";
import {Reveal} from "@/components/Reveal";
import {Progress} from "@/components/ui/progress";

export default function SkillsSection() {
  return (<section id="skills" className="mx-auto max-w-6xl px-6 pb-24">
    <Reveal>
      <h2 className="text-2xl font-semibold">Keahlian</h2>
    </Reveal>
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      {
        skillGroups.map((g, idx) => (<Reveal key={g.title} delay={idx * 0.06}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 font-semibold">{g.title}</h3>
            <div className="space-y-4">
              {
                g.items.map((s) => (<div key={s.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-200">
                      {s.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {s.level}%
                    </span>
                  </div>
                  <Progress value={s.level}/>
                </div>))
              }
            </div>
          </div>
        </Reveal>))
      }
    </div>
  </section>);
}
