"use client";

import { Terminal } from "@/components/ui/terminal";

export default function TerminalCard() {
  return (
    <section className="w-full py-6 sm:py-10 md:py-20">
      <Terminal
        commands={[
          "whoami",
          "npm run build-career",
          "docker ps --projects",
          "git status",
          "cat achievements.md",
          "deploy --production",
        ]}
        outputs={{
          0: ["Abdul Aziz A. De Borja", "Full-Stack Developer"],
          1: [
            "✔ Laravel Experience",
            "✔ React & Next.js Experience",
            "✔ REST API Development",
            "✔ Database Architecture",
            "✔ Cloud Deployment",
          ],
          2: [
            "StarExpressCargo",
            "PakilTourism",
            "DspeedCargoPH",
            "OngchadBills",
            "ShotAndCards",
          ],
          3: ["On branch main", "nothing to commit", "ready for production"],
          4: [
            "Springer Nature Publication (2026)",
            "IT Specialist - Network Security",
            "Best Capstone Project Award",
            "Project Lead Internship",
          ],
          5: ["Portfolio deployed successfully", "🌐 abduldbdev.vercel.app"],
        }}
        typingSpeed={45}
        delayBetweenCommands={1000}
      />
    </section>
  );
}
