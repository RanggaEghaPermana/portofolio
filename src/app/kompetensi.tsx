import type { Metadata } from 'next';
import Expertise from '@/components/Expertise';

export const metadata: Metadata = {
  title: 'Kompetensi — Rangga Egha Permana',
  description: 'Kedalaman kompetensi: keamanan web, pentest/Kali Linux, performa Laravel & Next.js, serta ops.',
};

export default function Page() {
  return <Expertise />;
}
