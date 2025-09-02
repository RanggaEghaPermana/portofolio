export type Depth = "Dasar" | "Menengah" | "Lanjut";

export type ExpertiseItem = {
  name: string;
  depth: Depth;
  bullets: string[]; // poin konkret/apa yang kamu lakukan
  tools?: string[]; // alat yang biasa dipakai
  related?: string[]; // konsep terkait
};

export type ExpertiseCategory = {
  title: string;
  items: ExpertiseItem[];
};

export const expertise: ExpertiseCategory[] = [
  {
    title: "Keamanan Aplikasi Web",
    items: [
      {
        name: "OWASP Top 10 & Hardening",
        depth: "Menengah",
        bullets: [
          "Mencegah XSS lewat output escaping & CSP dasar", "Lindungi CSRF dengan token & SameSite cookie", "Mitigasi SQLi via Query Builder/ORM + parameter binding"
        ],
        tools: [
          "Helmet/headers", "CSP", "Laravel Validation"
        ],
        related: ["XSS", "CSRF", "SQL Injection", "CORS"]
      }, {
        name: "Auth & Session Security",
        depth: "Menengah",
        bullets: [
          "Hash password (bcrypt/argon2), reset token, 2FA (opsional)", "Rate limit & brute-force protection", "JWT vs Session: trade-off & rotasi token"
        ],
        tools: [
          "Laravel Sanctum/JWT", "Throttle Middleware"
        ],
        related: ["Session fixation", "Remember-me", "Token rotation"]
      }, {
        name: "Security Headers",
        depth: "Dasar",
        bullets: [
          "CSP, X-Frame-Options, X-Content-Type-Options", "HSTS & HTTPS enforcement"
        ],
        tools: ["Nginx", "Cloudflare"]
      }
    ]
  }, {
    title: "Pentest & Kali Linux (etis)",
    items: [
      {
        name: "Reconnaissance & Enumeration",
        depth: "Dasar",
        bullets: [
          "Port scan & service detection untuk pemetaan permukaan serangan", "Subdir brute-force untuk probing endpoint"
        ],
        tools: ["nmap", "ffuf/gobuster", "whois/dig"]
      }, {
        name: "Traffic Analysis",
        depth: "Dasar",
        bullets: [
          "Analisa paket untuk deteksi kredensial plaintext/HTTP", "Validasi handshake TLS & cipher suite"
        ],
        tools: ["Wireshark", "tcpdump"]
      }, {
        name: "Web App Testing",
        depth: "Dasar",
        bullets: [
          "Manual test injeksi & auth bypass pada staging", "Gunakan proxy untuk intercept & repeatable test"
        ],
        tools: [
          "Burp Suite (CE)", "Postman"
        ],
        related: ["Responsible disclosure", "Scope & izin"]
      }
    ]
  }, {
    title: "Keamanan Jaringan & Server",
    items: [
      {
        name: "Segmentation & Firewall",
        depth: "Dasar",
        bullets: [
          "Segmentasi VLAN/role-based access", "Hardening SSH & fail2ban"
        ],
        tools: ["UFW/iptables", "fail2ban"]
      }, {
        name: "TLS & Cert Management",
        depth: "Dasar",
        bullets: [
          "Otomasi sertifikat", "Redirect & HSTS"
        ],
        tools: ["Let’s Encrypt", "Certbot", "Nginx"]
      }
    ]
  }, {
    title: "Performa & Optimasi Laravel",
    items: [
      {
        name: "Caching & Warmup",
        depth: "Menengah",
        bullets: [
          "Route/config/view cache untuk waktu bootstrap singkat", "Response caching & key strategy"
        ],
        tools: ["php artisan route:cache", "config:cache", "Redis"]
      }, {
        name: "Eloquent & DB Tuning",
        depth: "Menengah",
        bullets: [
          "Hindari N+1 (eager loading), indexing kolom, pagination/chunking", "Query profiling & optimasi JOIN"
        ],
        tools: ["Laravel Debugbar/Clockwork", "EXPLAIN"]
      }, {
        name: "Concurrency & Runtime",
        depth: "Dasar",
        bullets: [
          "Queue worker & Horizon untuk job berat", "Octane (Swoole/RoadRunner) untuk latency rendah"
        ],
        tools: ["Horizon", "Octane", "Supervisor"]
      }
    ]
  }, {
    title: "Performa Frontend & Next.js",
    items: [
      {
        name: "Rendering & Bundle Strategy",
        depth: "Menengah",
        bullets: [
          "Pilih SSR/SSG/ISR sesuai pola data", "Code-splitting & dynamic import untuk route berat"
        ],
        tools: ["Next App Router", "dynamic()"]
      }, {
        name: "Media & LCP",
        depth: "Menengah",
        bullets: [
          "Optimasi gambar via <Image>, ukuran & ukuran responsive", "Preload font & atur priority elemen di atas lipatan"
        ],
        tools: ["next/image", "font optimizer"]
      }, {
        name: "Caching & CDN",
        depth: "Dasar",
        bullets: [
          "Cache-control header & CDN layer", "Compression (gzip/brotli) & HTTP/2+"
        ],
        tools: ["Vercel/Netlify", "Cloudflare"]
      }
    ]
  }, {
    title: "Ops & Observability",
    items: [
      {
        name: "Logging & Monitoring",
        depth: "Dasar",
        bullets: [
          "Struktur log & korrelasi trace ID", "Alert untuk error puncak"
        ],
        tools: ["Sentry/Logtail", "Grafana (opsional)"]
      }, {
        name: "Release Hygiene",
        depth: "Dasar",
        bullets: [
          "Preview deploy per-branch", "Env separation & secret hygiene"
        ],
        tools: ["Vercel Preview", "dotenv"]
      }
    ]
  }
];
