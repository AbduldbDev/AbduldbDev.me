"use client";

import React, { useState } from "react";
import techstack from "@/data/homeTech";
import TechCard from "@/components/cards/TechCard";

const CARD_W = 96;
const GAP = 12;
const SPEED = 30;

export default function TechStack() {
  const [paused, setPaused] = useState(false);
  const totalWidth = techstack.length * (CARD_W + GAP);
  const duration = totalWidth / SPEED;

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-${totalWidth}px); }
        }
      `}</style>

      <section className="py-14 sm:py-20 border-y border-primary/[0.07]">
        {/* Header */}
        <div
          data-aos="fade-up"
          className="text-center mb-10 sm:mb-14 px-5 sm:px-6"
        >
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/30 mb-2 sm:mb-3">
            Technical Expertise
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight leading-tight">
            Technologies I work with
          </h2>
        </div>

        {/* Marquee */}
        <div
          className="overflow-hidden pt-3"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex"
            style={{
              gap: GAP,
              width: "max-content",
              animation: `marquee ${duration}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {Array(5)
              .fill(0)
              .map((_, groupIndex) =>
                techstack.map((tech, i) => (
                  <TechCard
                    key={`${groupIndex}-${tech.file}-${i}`}
                    tech={tech}
                  />
                )),
              )}
          </div>
        </div>
      </section>
    </>
  );
}
