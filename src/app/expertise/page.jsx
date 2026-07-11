import BentoGrid from "@/components/expertise/BentoGrid";
import Certifications from "@/components/expertise/Certifications";
import React from "react";

export default function expertise() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-margin-desktop py-16 sm:py-24 lg:py-30 overflow-x-hidden">
        <section className="mb-10 sm:mb-16">
          <div data-aos="fade-up">
            <h1 className="font-display-lg text-[32px] sm:text-[40px] md:text-[50px] font-bold text-text-primary">
              Stack &amp; <span className="text-primary">Reach</span>
            </h1>
            <p className="font-body-lg text-body-lg-sm sm:text-body-lg text-text-secondary max-w-2xl">
              A precision-engineered architectural foundation. My stack is
              curated for performance, scalability, and technical excellence.
            </p>
          </div>
        </section>

        <BentoGrid />
        <Certifications />
      </main>
    </>
  );
}
