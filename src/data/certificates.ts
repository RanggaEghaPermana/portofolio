export type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string; // "2024-11-05"
  credentialId?: string;
  verifyUrl?: string;
  skills?: string[];
};

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Laravel Web Development",
    issuer: "Dicoding",
    date: "2024-08-12",
    credentialId: "ABCD-1234",
    verifyUrl: "https://www.dicoding.com/cert/your-cert-id",
    skills: ["Laravel", "REST API", "Auth"]
  }, {
    id: 2,
    title: "React & Next.js",
    issuer: "Udemy",
    date: "2024-05-01",
    skills: ["React", "Next.js", "Tailwind"]
  }
];
