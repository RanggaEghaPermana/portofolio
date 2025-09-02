'use client';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <LazyMotion features={domAnimation}>
      <m.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="min-h-screen"
      >
        {children}
      </m.main>
    </LazyMotion>
  );
}
