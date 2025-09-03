// FILE: src/components/Nav.tsx
import Link from "next/link";

const navLinks = [
  {
    href: "/",
    label: "Home"
  }, {
    href: "/#projects",
    label: "Projects"
  }, {
    href: "/#skills",
    label: "Skills"
  }, {
    href: "/kompetensi",
    label: "Kompetensi"
  }, { // ← tambahan
    href: "/#experience",
    label: "Experience"
  }, {
    href: "/dokumentasi",
    label: "Dokumentasi"
  }, {
    href: "/sertifikat",
    label: "Sertifikat"
  }, {
    href: "/#contact",
    label: "Contact"
  }
] as const;

export default function Nav() {
  return (<header className="sticky top-0 z-40 w-full">
    <div className="mx-auto max-w-6xl px-4 pt-4">
      <div className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800/60 dark:bg-slate-900/50">
        <nav className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <span className="rounded-lg bg-slate-900 px-2 py-1 text-white dark:bg-white dark:text-slate-900">
              RE
            </span>
          </Link>

          <ul className="flex items-center gap-2 text-sm">
            {
              navLinks.map((l) => (<li key={l.label}>
                <Link href={l.href} className="rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                  {l.label}
                </Link>
              </li>))
            }
          </ul>
        </nav>
      </div>
    </div>
  </header>);
}
