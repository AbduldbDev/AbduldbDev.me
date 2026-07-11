"use client";

import React, { useEffect, useState } from "react";
import TerminalCard from "@/components/cards/TerminalCard";
import { Sparkles } from "lucide-react";
import TypewriterHeading from "../ui/typewriter";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="max-w-8xl min-h-screen relative flex flex-col justify-center px-5 sm:px-6 md:px-10 lg:px-margin-desktop max-w-8xl mx-auto pt-20 sm:pt-24 lg:pt-16 pb-16 sm:pb-24 lg:pb-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16 w-full">
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="space-y-3 sm:space-y-4 max-w-3xl z-10 text-center lg:text-left relative transition-all duration-700 opacity-100"
          >
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-primary/30 bg-primary/5 rounded-full">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-primary uppercase tracking-widest">
                Available for Architecture &amp; Development
              </span>
            </div>

            <h1 className="font-display-lg text-display-lg-xs sm:text-display-lg-sm md:text-display-lg-mobile lg:text-display-lg leading-tight">
              Abdul Aziz A. De Borja
            </h1>

            <TypewriterHeading />

            <p className="font-body-lg text-body-lg-sm sm:text-body-lg text-text-muted leading-relaxed">
              A web developer passionate about creating functional,
              user-friendly websites and applications. Enjoys turning ideas into
              digital solutions using modern web technologies.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-10 justify-center lg:justify-start">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/DeBorja_CV.pdf";
                  link.download = "/DeBorja_CV.pdf";
                  link.click();
                }}
                className="bg-surface-card border border-primary text-primary px-5 sm:px-8 py-3 sm:py-4 rounded font-label-caps text-label-caps-xs sm:text-label-caps transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_30px_rgba(173,198,255,0.15)]"
              >
                Download Resume
              </button>
              <Link
                href="/projects"
                className="bg-transparent border border-border-hairline text-text-secondary px-5 sm:px-8 py-3 sm:py-4 rounded font-label-caps text-label-caps-xs sm:text-label-caps hover:border-text-primary hover:text-text-primary transition-all"
              >
                Explore My Work
              </Link>
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="700"
            data-aos-delay="150"
            className="w-full flex justify-center lg:justify-end"
          >
            <TerminalCard />
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 transition-all duration-700">
          <span className="font-label-caps text-[10px] tracking-widest text-text-muted">
            SCROLL
          </span>
          <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
        </div>
      </section>
    </>
  );
}
