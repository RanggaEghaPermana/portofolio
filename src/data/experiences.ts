export type Experience = {
  period: string;
  title: string;
  org: string;
  desc: string;
};

export const experiences: Experience[] = [
  {
    period: "2025 – Sekarang",
    title: "Mahasiswa (Semester 7), Teknik Informatika",
    org: "Universitas Buana Perjuangan Karawang",
    desc: "Fokus pada pengembangan full-stack: React/Next.js, Laravel, dan desain database (MySQL/MongoDB)."
  }, {
    period: "2024 – 2025",
    title: "Frontend/Full-Stack Intern (SDMO/HR)",
    org: "Perum Peruri (BUMN)",
    desc: "Membangun dashboard SDM: anggaran, fasilitas, kinerja, dan data karyawan. Stack Laravel + React + MySQL; pengelolaan data melalui SAP."
  }, {
    period: "2024 – 2025",
    title: "Freelance Developer — POS Fotokopi",
    org: "Project Independen",
    desc: "POS web + mobile (Flutter) dengan pembayaran QR/cash dan dashboard finansial. Backend Laravel + MySQL, frontend React."
  }, {
    period: "SMK – Sekarang",
    title: "Proyek Kampus & Pribadi",
    org: "Texmaco Karawang → UBP Karawang",
    desc: "Perpustakaan Online berbasis QR, eksperimen Flutter, serta berbagai aplikasi web untuk pembelajaran."
  }
];
