// FILE: src/app/kompetensi/page.tsx
import type { Metadata } from "next";
import Expertise from "@/components/Expertise";

export const metadata: Metadata = {
  title: "Kompetensi — Rangga Egha Permana",
  description:
    "Daftar kompetensi dan kedalaman penguasaan: Frontend/React, Laravel, keamanan web, dan toolset pendukung.",
};

export default function Page() {
  return <Expertise />;
}
