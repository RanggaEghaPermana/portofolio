import type { Metadata } from 'next';
import Certificates from '@/components/Certificates';

export const metadata: Metadata = {
  title: 'Sertifikat — Rangga Egha Permana',
  description: 'Kredensial dan sertifikasi yang relevan.',
};

export default function Page() {
  return <Certificates />;
}
