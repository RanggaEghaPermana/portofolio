'use client';
import { certificates } from '@/data/certificates';
import { Reveal } from '@/components/Reveal';
import { ExternalLink } from 'lucide-react';

export default function Certificates() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <Reveal><h2 className="text-2xl font-semibold">Sertifikat</h2></Reveal>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {certificates.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="font-semibold">{c.title}</h3>
              <div className="mt-1 text-sm text-slate-500">{c.issuer} • {c.date}</div>

              {c.skills?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <span key={s} className="rounded-full border border-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300">{s}</span>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                {c.credentialId ? <div>ID: {c.credentialId}</div> : null}
                {c.verifyUrl ? (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    Verifikasi <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
