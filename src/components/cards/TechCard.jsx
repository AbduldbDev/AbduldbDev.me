"use client";

import React, { useState } from "react";

export default function TechCard({ tech }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex flex-col items-center justify-center gap-1.5 sm:gap-2
        rounded-xl border transition-all duration-200 cursor-default select-none
        ${
          hovered
            ? "bg-primary/10 border-primary/30 -translate-y-1"
            : "bg-primary/3 border-primary/8"
        }
      `}
    >
      <img
        src={`/TechStack/${tech.file}.svg`}
        alt={tech.label}
        width={32}
        height={32}
        className="object-contain transition-all duration-200 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
        style={{
          filter: hovered
            ? "brightness(0) saturate(100%) invert(82%) sepia(20%) saturate(500%) hue-rotate(195deg) brightness(105%)"
            : "brightness(0) saturate(100%) invert(82%) sepia(20%) saturate(500%) hue-rotate(195deg) brightness(105%) opacity(0.4)",
        }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span
        className={`text-[7px] sm:text-[8px] md:text-[9px] font-semibold tracking-widest uppercase font-sans transition-colors duration-200 ${
          hovered ? "text-primary/80" : "text-primary/25"
        }`}
      >
        {tech.label}
      </span>
    </div>
  );
}
