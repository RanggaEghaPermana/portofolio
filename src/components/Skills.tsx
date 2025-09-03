// FILE: src/components/Skills.tsx
"use client";

import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/Reveal";
import { Progress } from "@/components/ui/progress";
import {
  Code2,
  Server,
  Database as Db,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  Frontend: Code2,
  Backend: Server,
  Database: Db,
  "Keamanan & DevOps": ShieldCheck,
  "Tools & Workflow": Wrench,
};

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal>
        <h2 className="text-2xl font-semibold">Keahlian</h2>
      </Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {skillGroups.map((g, idx) => {
          const Icon = iconFor[g.title] ?? Wrench;
          return (
            <Reveal key={g.title} delay={idx * 0.06}>
              <article
                className="
                  rounded-2xl border border-slate-200 bg-white p-6 shadow-sm
                  dark:border-slate-800 dark:bg-slate-900
                "
              >
                <header className="mb-4 flex items-center gap-3">
                  <span
                    className="
                      grid h-9 w-9 place-items-center rounded-xl
                      border border-slate-200 bg-slate-50 text-slate-700
                      dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200
                    "
                    aria-hidden
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-semibold">{g.title}</h3>
                </header>

                <ul className="space-y-4">
                  {g.items.map((s) => (
                    <li key={s.name}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="truncate text-slate-700 dark:text-slate-200">
                          {s.name}
                        </span>
                        <span className="tabular-nums text-slate-500 dark:text-slate-400">
                          {s.level}%
                        </span>
                      </div>
                      <Progress value={s.level} ariaLabel={`${s.name} ${s.level}%`} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
