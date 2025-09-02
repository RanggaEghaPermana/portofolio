import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ToastProvider';
import ThemeToggle from '@/components/ThemeToggle';
import Nav from '@/components/Nav';
import HashScroll from '@/components/HashScroll';

export const metadata: Metadata = {
  title: 'Portofolio Rangga Egha Permana',
  description: 'Full-Stack Developer — React/Next.js • Laravel • MySQL • MongoDB',
};

const themeInit = `
(function() {
  try {
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = saved || prefers;
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <ToastProvider>
          <Nav />
          <HashScroll offset={88} />
          {children}
          <ThemeToggle />
        </ToastProvider>
      </body>
    </html>
  );
}
