// FILE: src/components/Intro.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {m, useReducedMotion, LazyMotion, domAnimation} from "framer-motion";
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
  return (<m.div initial={reduce
      ? {
        opacity: 0
      }
      : {
        opacity: 0,
        y: 16
      }} animate={{
      opacity: 1,
      y: 0
    }} transition={reduce
      ? {
        duration: 0
      }
      : {
        duration: 0.45,
        ease: "easeOut",
        delay
      }
} className="will-change-[transform,opacity] transform-gpu">
    {children}
  </m.div>);
}

export default function Intro() {
  const reduce = useReducedMotion();

  return (<section id="home" className="mx-auto max-w-6xl px-6 pb-24 pt-24">
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
      {/* Kiri: avatar */}
      <div className="md:col-span-5">
        <MotionWrap>
          <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-2 ring-slate-200 dark:ring-slate-800">
            <Image src="/avatar.jpg" alt="Rangga Egha Permana" width={160} height={160} priority="priority" loading="eager" decoding="async" sizes="(max-width: 768px) 128px, 160px" className="h-40 w-40 object-cover"/>
          </div>
        </MotionWrap>

        <Reveal delay={0.08}>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-800 dark:text-slate-200">
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Frontend
              <br/>
              <span className="text-slate-500">React, Next.js, Tailwind</span>
            </li>
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Backend
              <br/>
              <span className="text-slate-500">Laravel, REST API, Auth</span>
            </li>
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Database
              <br/>
              <span className="text-slate-500">MySQL, MongoDB</span>
            </li>
            <li className="rounded-2xl border border-slate-200 p-3 shadow-sm dark:border-slate-800">
              Tools
              <br/>
              <span className="text-slate-500">GitHub, SAP, VS Code</span>
            </li>
          </ul>
        </Reveal>
      </div>

      {/* Kanan: deskripsi */}
      <div className="md:col-span-7">
        <MotionWrap delay={0.05}>
          <h1 className="text-balance text-3xl font-semibold sm:text-4xl">
            Hi, saya{" "}
            <span className="underline decoration-slate-300 dark:decoration-slate-700">
              Rangga Egha Permana
            </span>{" "}
            -Full-Stack Developer.
          </h1>
        </MotionWrap>

        <MotionWrap delay={0.08}>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Saya membangun aplikasi web end-to-end: desain UI/UX, frontend React/Next.js, backend Laravel, dan integrasi database. Fokus pada kualitas kode, performa, dan pengalaman pengguna.
          </p>
        </MotionWrap>

        <MotionWrap delay={0.12}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="#projects" className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-5 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100" prefetch={false}>
              Lihat Proyek
            </Link>
            <Link href="#contact" className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 px-5 text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800" prefetch={false}>
              Hubungi Saya
            </Link>

            <div className="ml-1 flex items-center gap-2">
              <a href="https://github.com/RanggaEghaPermana" target="_blank" rel="noreferrer" className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Github className="h-5 w-5" aria-label="GitHub"/>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Linkedin className="h-5 w-5" aria-label="LinkedIn"/>
              </a>
              <a href="mailto:rangga@example.com" className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Mail className="h-5 w-5" aria-label="Email"/>
              </a>
            </div>
          </div>
        </MotionWrap>
      </div>
    </div>
  </section>);
}
