import React from "react";
import Link from "next/link";

export default function Publication() {
  return (
    <section className="mb-8 sm:mb-section-gap">
      <div
        data-aos="fade-up"
        className="flex items-end justify-between mb-6 sm:mb-12 gap-3 sm:gap-4"
      >
        <div className="min-w-0 shrink">
          <h2 className="font-headline-sm text-xl sm:text-headline-sm text-text-primary">
            Research Publications
          </h2>
          <p className="text-text-muted mt-1 text-xs sm:text-base">
            Contributing to the academic discourse on digital transformation and
            logistics technology.
          </p>
        </div>
        <div className="h-px grow mx-8 bg-border-hairline mb-4 hidden md:block" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="glass-card p-4 sm:p-8 rounded-xl"
      >
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-3 sm:gap-4">
            <div className="grow">
              <h3 className="font-headline-sm text-lg sm:text-headline-sm mb-2">
                Development of a Delivery Application for Star Express Cargo
              </h3>

              <p className="text-text-primary text-sm sm:font-body-lg mb-1 sm:mb-2">
                Proceedings of 2025 11th International Conference on e-Society,
                e-Learning and e-Technologies (ICSLT 2025)
              </p>

              <p className="text-text-muted text-xs sm:font-body-base mb-4 sm:mb-6">
                Springer Nature - Lecture Notes in Networks and Systems
              </p>

              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] sm:text-[10px] font-label-caps rounded-full border border-primary/20">
                  Scopus-Indexed
                </span>

                <span className="px-2.5 py-1 bg-surface-container text-text-muted text-[9px] sm:text-[10px] font-label-caps rounded-full border border-border-hairline">
                  EID: 2-s2.0-105039302002
                </span>

                <a
                  href="https://doi.org/10.1007/978-3-032-13153-9_22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] sm:text-[10px] font-label-caps rounded-full border border-primary/20 hover:bg-primary hover:text-canvas transition-colors"
                >
                  DOI: 10.1007/978-3-032-13153-9_22
                </a>
              </div>
              <a
                href="https://doi.org/10.1007/978-3-032-13153-9_22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-1 bg-primary text-on-primary font-label-caps text-label-caps-xs rounded-full hover:scale-[1.02] hover:opacity-90 transition-all"
              >
                View Publication
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
              <span className="font-label-caps text-[10px] sm:text-label-caps text-text-muted">
                First Online
              </span>
              <span className="text-sm sm:font-body-base text-text-primary">
                01 April 2026
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-border-hairline">
            <div>
              <span className="font-label-caps text-[9px] sm:text-[10px] text-text-muted uppercase block mb-2">
                Authors
              </span>
              <p className="text-text-secondary text-sm sm:font-body-base">
                Zyrha Alliah Rausa, Andrea Charisse Celino, Abdul Aziz De Borja,
                &amp; Marco Paulo Burgos
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-2">
              <div>
                <span className="font-label-caps text-[9px] sm:text-[10px] text-text-muted uppercase block mb-1">
                  Volume
                </span>
                <p className="text-text-secondary text-sm sm:font-body-base">
                  1754 LNNS
                </p>
              </div>

              <div>
                <span className="font-label-caps text-[9px] sm:text-[10px] text-text-muted uppercase block mb-1">
                  Pages
                </span>
                <p className="text-text-secondary text-sm sm:font-body-base">
                  285–297
                </p>
              </div>

              <div>
                <span className="font-label-caps text-[9px] sm:text-[10px] text-text-muted uppercase block mb-1">
                  ISSN
                </span>
                <p className="text-text-secondary text-sm sm:font-body-base">
                  23673370
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
