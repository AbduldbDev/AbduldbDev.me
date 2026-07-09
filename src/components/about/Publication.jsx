import React from "react";
import Link from "next/link";

export default function Publication() {
  return (
    <section className="mb-10 sm:mb-section-gap">
      <div
        data-aos="fade-up"
        className="flex items-end justify-between mb-8 sm:mb-12 gap-4"
      >
        <div className="min-w-0 shrink">
          <h2 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm text-text-primary">
            Research Publications
          </h2>
          <p className="text-text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            Contributing to the academic discourse on digital transformation and
            logistics technology.
          </p>
        </div>
        <div className="h-px grow mx-4 sm:mx-8 bg-border-hairline mb-4 hidden md:block" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="glass-card p-5 sm:p-8 rounded-xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="grow">
              <h3 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm mb-2 sm:mb-3">
                Development of a Delivery Application for Star Express Cargo
              </h3>
              <p className="text-text-primary font-body-lg mb-2">
                Proceedings of 2025 11th International Conference on e-Society,
                e-Learning and e-Technologies (ICSLT 2025)
              </p>
              <p className="text-text-muted font-body-base mb-4">
                Springer Nature - Lecture Notes in Networks and Systems
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-label-caps rounded-full border border-primary/20">
                  Scopus-Indexed
                </span>
                <span className="px-3 py-1 bg-surface-container text-text-muted text-[10px] font-label-caps rounded-full border border-border-hairline">
                  EID: 2-s2.0-105039302002
                </span>
                <a
                  href="https://doi.org/10.1007/978-3-032-13153-9_22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-label-caps rounded-full border border-primary/20 hover:bg-primary hover:text-canvas transition-colors"
                >
                  DOI: 10.1007/978-3-032-13153-9_22
                </a>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="font-label-caps text-label-caps text-text-muted">
                First Online
              </span>
              <span className="font-body-base text-text-primary">
                01 April 2026
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border-hairline">
            <div>
              <span className="font-label-caps text-[10px] text-text-muted uppercase block mb-2">
                Authors
              </span>
              <p className="text-text-secondary font-body-base">
                Zyrha Alliah Rausa, Andrea Charisse Celino, Abdul Aziz De Borja,
                &amp; Marco Paulo Burgos
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <div>
                <span className="font-label-caps text-[10px] text-text-muted uppercase block mb-1">
                  Volume
                </span>
                <p className="text-text-secondary font-body-base">1754 LNNS</p>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-text-muted uppercase block mb-1">
                  Pages
                </span>
                <p className="text-text-secondary font-body-base">285–297</p>
              </div>
              <div>
                <span className="font-label-caps text-[10px] text-text-muted uppercase block mb-1">
                  ISSN
                </span>
                <p className="text-text-secondary font-body-base">23673370</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
