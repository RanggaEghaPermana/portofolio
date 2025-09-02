export type Event = {
  id: number;
  title: string;
  date: string; // "2025-03-12"
  location?: string;
  description?: string;
  images: string[]; // /public/events/xxx.jpg
  tags?: string[];
};

export const events: Event[] = [
  {
    id: 1,
    title: "Seminar Web Teknologi",
    date: "2025-02-10",
    location: "Jakarta",
    description: "Sharing tren Next.js & praktik deploy yang efisien.",
    images: [
      "/events/seminar-1.jpg", "/events/seminar-2.jpg"
    ],
    tags: ["Seminar", "Community"]
  }, {
    id: 2,
    title: "Kunjungan Proyek Luar Kota",
    date: "2025-01-22",
    location: "Bandung",
    description: "Kick-off integrasi modul POS di cabang baru.",
    images: ["/events/trip-1.jpg"],
    tags: ["On-site", "Implementation"]
  }
];
