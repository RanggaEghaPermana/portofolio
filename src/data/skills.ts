export type Skill = {
  name: string;
  level: number
};
export type SkillGroup = {
  title: string;
  items: Skill[]
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      {
        name: "HTML & CSS",
        level: 90
      }, {
        name: "Bootstrap",
        level: 80
      }, {
        name: "Tailwind CSS",
        level: 90
      }, {
        name: "React / Next.js (App Router)",
        level: 85
      }, {
        name: "Framer Motion (animasi)",
        level: 80
      }, {
        name: "Flutter (mobile UI)",
        level: 60
      }
    ]
  }, {
    title: "Backend",
    items: [
      {
        name: "PHP & Laravel",
        level: 85
      }, {
        name: "REST API & Auth/Middleware",
        level: 75
      }
    ]
  }, {
    title: "Database",
    items: [
      {
        name: "MySQL",
        level: 80
      }, {
        name: "MongoDB",
        level: 65
      }
    ]
  }, {
    title: "Keamanan & DevOps", // <-- baru
    items: [
      {
        name: "Kali Linux (dasar)",
        level: 55
      }, {
        name: "OWASP Top 10",
        level: 65
      }, {
        name: "Linux Server & Nginx",
        level: 60
      }, {
        name: "TLS/HTTPS & Security Headers",
        level: 60
      }, {
        name: "Redis & Caching",
        level: 55
      }, {
        name: "Monitoring & Logs",
        level: 50
      }
    ]
  }, {
    title: "Tools & Ops",
    items: [
      {
        name: "Git & GitHub",
        level: 85
      }, {
        name: "SAP (HR data ops)",
        level: 60
      }, {
        name: "Deploy Netlify/Vercel",
        level: 80
      }
    ]
  }
];
