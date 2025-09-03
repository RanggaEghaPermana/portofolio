// FILE: src/components/Gallery.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { events, type Event } from '@/data/events';
import { Reveal } from '@/components/Reveal';
import { Modal } from '@/components/Modal';
import { CalendarDays, MapPin } from 'lucide-react';

export default function Gallery() {
  const [active, setActive] = useState<Event | null>(null);
  const [idx, setIdx] = useState(0);

  const open = (ev: Event, start = 0) => { setActive(ev); setIdx(start); };
  const next = () => setIdx((i) => (active ? (i + 1) % active.images.length : i));
  const prev = () => setIdx((i) => (active ? (i - 1 + active.images.length) % active.images.length : i));

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-24">
      <Reveal><h2 className="text-2xl font-semibold">Dokumentasi</h2></Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, i) => (
          <Reveal key={ev.id} delay={i * 0.06}>
            <article
              onClick={() => open(ev)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={ev.images[0]}
                  alt={ev.title}
                  width={800}
                  height={600}
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{ev.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {ev.date}</span>
                  {ev.location ? <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {ev.location}</span> : null}
                </div>
                {ev.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ev.tags.map((t) => (
                      <span key={t} className="rounded-full border border-slate-300 px-2 py-1 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">{t}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title}>
        {active && (
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={active.images[idx]}
                alt={`${active.title} - ${idx + 1}`}
                fill
                sizes="(min-width:1024px) 768px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            {active.description ? <p className="text-sm text-slate-700 dark:text-slate-300">{active.description}</p> : null}
            <div className="flex items-center gap-3">
              <button onClick={prev} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">Prev</button>
              <button onClick={next} className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">Next</button>
              <span className="text-xs text-slate-500">{idx + 1} / {active.images.length}</span>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
