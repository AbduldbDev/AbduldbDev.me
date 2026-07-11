import Image from "next/image";
import Biography from "@/components/about/Biography";
import Experience from "@/components/about/Experience";
import Education from "@/components/about/Education";
import Publication from "@/components/about/Publication";

export default function About() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-margin-desktop mb-16 sm:mb-24 lg:mb-30 relative z-10 overflow-hidden">
        <Biography />
        <Experience />
        <Education />
        <Publication />
      </main>
    </>
  );
}
