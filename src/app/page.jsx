import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import Ecosystem from "@/components/home/Ecosystem";
import Parallax from "@/components/ui/Parallax";
import TechStack from "@/components/home/TechStack";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <main className="relative z-10">
        <Hero />
        <Statistics />
        <Ecosystem />
        <Parallax />
        <TechStack />
        <CTA />
      </main>
    </>
  );
}
