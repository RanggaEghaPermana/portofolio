'use client';
import { useState } from 'react';
import Image from 'next/image';
import { projects, type Project } from '@/data/projects';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal><h2 className="text-2xl font-semibold">Proyek Terbaru</h2></Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06}>
            <TiltCard>
              <article
                onClick={() => setActive(p)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <Image
                    src={p.thumbnail}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw"
                    priority={i < 2}
                  />
                </div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="space-y-4">
            {active.video ? (
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src={active.video}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={active.title}
                />
              </div>
            ) : (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                <Image src={active.thumbnail} alt={active.title} fill className="object-cover" sizes="(min-width: 1024px) 768px, 100vw" />
              </div>
            )}

            <p className="text-sm text-slate-700 dark:text-slate-300">{active.description}</p>
            <div className="flex flex-wrap gap-2">
              {active.tags.map((t) => (
                <span key={t} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs dark:bg-slate-800">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {active.link ? (
                <Button asChild><a href={active.link} target="_blank" rel="noopener noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Lihat Demo</a></Button>
              ) : null}
              {active.repo ? (
                <Button asChild variant="outline"><a href={active.repo} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" />GitHub</a></Button>
              ) : null}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
