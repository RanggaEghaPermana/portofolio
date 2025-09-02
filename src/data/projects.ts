export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  video?: string;
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Perpustakaan Online (QR) — Laravel & Flutter",
    description: "Platform peminjaman/pengembalian buku berbasis QR dengan dashboard admin, manajemen koleksi/anggota, dan laporan. Backend Laravel + MySQL, aplikasi mobile Flutter untuk proses scanning.",
    tags: [
      "Laravel", "MySQL", "Flutter", "QR", "Dashboard"
    ],
    thumbnail: "/projects/perpus-qr.jpg",
    repo: "https://github.com/RanggaEghaPermana"
  }, {
    id: 2,
    title: "Peruri HR Dashboard — SDMO/HR (Magang 6 Bulan)",
    description: "Dashboard SDM untuk monitoring anggaran, fasilitas, kinerja, dan data karyawan. Stack Laravel + React, basis data MySQL, dengan integrasi dan pengelolaan data melalui SAP.",
    tags: [
      "Laravel", "React", "MySQL", "SAP", "Dashboard"
    ],
    thumbnail: "/projects/peruri-hr.jpg"
  }, {
    id: 3,
    title: "Kasir Fotokopi (POS) — Web & Mobile",
    description: "Sistem POS yang mendukung barang & jasa, pembayaran QR/cash, serta dashboard keuangan. Arsitektur web (Laravel + React) dan kasir mobile terpisah (Flutter) untuk operasional cepat.",
    tags: [
      "Laravel", "React", "Flutter", "QR Payment", "MySQL"
    ],
    thumbnail: "/projects/kasir-fotocopy.jpg",
    repo: "https://github.com/RanggaEghaPermana"
  }
];
