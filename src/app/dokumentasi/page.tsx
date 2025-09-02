import type { Metadata } from 'next';
import Gallery from '@/components/Gallery';

export const metadata: Metadata = {
  title: 'Dokumentasi — Rangga Egha Permana',
  description: 'Galeri kegiatan: seminar, kunjungan proyek, dan aktivitas lapangan.',
};

export default function Page() {
  return <Gallery />;
}
