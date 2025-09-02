"use client";

import Link from "next/link";
import Image from "next/image";
import {m, useReducedMotion} from "framer-motion";
import {Github, Linkedin, Mail} from "lucide-react";
import {Reveal} from "@/components/Reveal";

function MotionWrap({
  children,
  delay = 0
} : {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (<m.div initial={{
      opacity: 0,
      y: reduce
        ? 0
        : 14
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      ease: "easeOut",
      delay
    }}>
    {children}
  </m.div>);
}

export default function Intro() {
  return (<section id="about" className="relative overflow-hidden py-16 md:py-24" aria-label="Perkenalan">
    {/* gradient mesh + dot grid */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-[-12rem] h-[28rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400/25 via-sky-400/25 to-cyan-300/25 blur-3xl"/>
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0), radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0,12px 12px"
        }}/>
    </div>

    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-12">
      {/* Kiri: avatar + nama + title */}
      <div className="md:col-span-5">
        <MotionWrap>
          <div className="mb-6">
            <div className="relative h-32 w-32 overflow-hidden rounded-full p-[3px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-sky-400 to-cyan-400"/>
              <div className="relative z-10 h-full w-full overflow-hidden rounded-full bg-white dark:bg-slate-950">
                {/* Gunakan width/height agar tidak kena error 'fill' */}
                <Image src="/avatar.jpg" alt="Rangga Egha Permana" width={128} height={128} className="h-full w-full object-cover"/>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            <span className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
              Rangga Egha Permana
            </span>
          </h1>
          <div className="mt-3 text-base md:text-lg text-slate-600 dark:text-slate-300">
            Full-Stack Developer — React/Next.js • Laravel • MySQL • MongoDB
          </div>
        </MotionWrap>
      </div>

      {/* Kanan: deskripsi + CTA + sosial */}
      <div className="md:col-span-7">
        <MotionWrap delay={0.05}>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Saya membangun aplikasi web end-to-end: antarmuka yang rapi dan responsif, API yang bersih, serta integrasi data yang andal. Berpengalaman pada dashboard SDM terintegrasi SAP di Perum Peruri, aplikasi Perpustakaan berbasis QR (Laravel + Flutter), dan sistem POS Fotokopi (web + mobile). Fokus pada kualitas kode, performa, dan pengalaman pengguna.
          </p>
        </MotionWrap>

        <MotionWrap delay={0.12}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Tanpa asChild: style tombol langsung di Link */}
            <Link href="#projects" className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-base font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
              Lihat Portofolio
            </Link>
            <Link href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-base font-medium text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
              Unduh CV
            </Link>
            <span className="ml-1 inline-flex items-center rounded-full border border-emerald-300/60 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-700/50 dark:bg-emerald-900/40 dark:text-emerald-100">
              Tersedia freelance
            </span>
          </div>
        </MotionWrap>

        <Reveal delay={0.18}>
          <div className="mt-6 flex items-center gap-3 text-slate-500">
            <Link href="https://github.com/RanggaEghaPermana" className="rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label="GitHub">
              <Github className="h-5 w-5"/>
            </Link>
            <Link href="https://www.linkedin.com/" className="rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5"/>
            </Link>
            <Link href="mailto:your@email.com" className="rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label="Email">
              <Mail className="h-5 w-5"/>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <ul className="mt-6 grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-3">
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Frontend
              <br/>
              <span className="text-slate-500">
                React/Next.js, Tailwind, Motion
              </span>
            </li>
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Backend
              <br/>
              <span className="text-slate-500">Laravel, REST API, Auth</span>
            </li>
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Database & Integrasi
              <br/>
              <span className="text-slate-500">MySQL, MongoDB, SAP</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </div>
  </section>);
}
