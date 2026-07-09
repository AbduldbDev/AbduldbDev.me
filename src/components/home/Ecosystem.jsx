import React from "react";

export default function Ecosystem() {
  return (
    <>
      <section className="py-section-gap-mobile sm:py-section-gap-tablet lg:py-section-gap px-5 sm:px-6 md:px-margin-desktop max-w-7xl mx-auto">
        {}
        <div
          className="mb-10 sm:mb-16 transition-all duration-700 opacity-100"
          data-aos="fade-up"
        >
          <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md mb-3 sm:mb-4">
            Technical Ecosystem
          </h2>
          <div className="w-16 h-1 bg-primary"></div>
          <p className="font-body-base text-body-base-sm sm:text-body-base text-text-muted mt-4 sm:mt-6 max-w-xl">
            A multi-layered stack spanning backend APIs, reactive interfaces,
            and production deployments — built across 20+ real-world projects.
          </p>
        </div>

        {}
        <div className="grid grid-cols-12 gap-4 sm:gap-gutter transition-all duration-700 opacity-100">
          {}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="col-span-12 md:col-span-7 p-4 sm:p-card-padding bg-surface-card border border-border-hairline rounded-lg hover:border-primary/40 transition-all group overflow-hidden relative"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary mb-3 sm:mb-4 text-3xl sm:text-4xl">
                dns
              </span>
              <h3 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm mb-3 sm:mb-4">
                Backend Engineering
              </h3>
              <p className="font-body-base text-body-base-sm sm:text-body-base text-text-muted mb-4 sm:mb-6">
                Designing and shipping production Laravel applications with
                RESTful APIs, Role-Based Access Control, MVC architecture, and
                normalized relational database schemas. Deployed across
                Hostinger, Render, and Vercel.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "LARAVEL",
                  "PHP",
                  "NODE.JS",
                  "EXPRESS.JS",
                  "REST API",
                  "MVC",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 sm:px-3 py-1 bg-canvas border border-border-hairline text-text-muted font-label-caps text-[10px] rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -right-5 -bottom-5 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[180px]">
                hub
              </span>
            </div>
          </div>

          {}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="col-span-12 md:col-span-5 p-4 sm:p-card-padding bg-surface-card border border-border-hairline rounded-lg hover:border-primary/40 transition-all group"
          >
            <span className="material-symbols-outlined text-primary mb-3 sm:mb-4 text-3xl sm:text-4xl">
              dynamic_form
            </span>
            <h3 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm mb-3 sm:mb-4">
              Reactive Interfaces
            </h3>
            <p className="font-body-base text-body-base-sm sm:text-body-base text-text-muted mb-4 sm:mb-6">
              Building fluid user experiences with React, Next.js, and
              Inertia.js — from dashboard UIs to mobile-first public platforms.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "REACT",
                "NEXT.JS",
                "VUE.JS",
                "INERTIA.JS",
                "TAILWIND",
                "TYPESCRIPT",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2 sm:px-3 py-1 bg-canvas border border-border-hairline text-text-muted font-label-caps text-[10px] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="col-span-12 md:col-span-4 p-4 sm:p-card-padding bg-surface-card border border-border-hairline rounded-lg hover:border-primary/40 transition-all group"
          >
            <span className="material-symbols-outlined text-primary mb-3 sm:mb-4 text-3xl sm:text-4xl">
              database
            </span>
            <h4 className="font-headline-sm text-[16px] sm:text-[20px] mb-2 sm:mb-3">
              Data & Storage
            </h4>
            <p className="font-body-base text-[13px] sm:text-[14px] text-text-muted">
              Architecting relational schemas in MySQL and PostgreSQL, with
              Firebase and MongoDB for document and real-time data needs.
            </p>
          </div>

          {}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="col-span-12 md:col-span-4 p-4 sm:p-card-padding bg-surface-card border border-border-hairline rounded-lg hover:border-primary/40 transition-all group"
          >
            <span className="material-symbols-outlined text-primary mb-3 sm:mb-4 text-3xl sm:text-4xl">
              cloud_upload
            </span>
            <h4 className="font-headline-sm text-[16px] sm:text-[20px] mb-2 sm:mb-3">
              Deployment & DevOps
            </h4>
            <p className="font-body-base text-[13px] sm:text-[14px] text-text-muted">
              Shipping production apps on Vercel, AWS, Render, Azure, and
              Hostinger — with Git-based workflows and CI/CD pipelines.
            </p>
          </div>

          {}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="col-span-12 md:col-span-4 p-4 sm:p-card-padding bg-surface-card border border-border-hairline rounded-lg hover:border-primary/40 transition-all group"
          >
            <span className="material-symbols-outlined text-primary mb-3 sm:mb-4 text-3xl sm:text-4xl">
              smartphone
            </span>
            <h4 className="font-headline-sm text-[16px] sm:text-[20px] mb-2 sm:mb-3">
              Mobile Development
            </h4>
            <p className="font-body-base text-[13px] sm:text-[14px] text-text-muted">
              Built native Android in Java and cross-platform mobile apps using
              React Native Expo — both for the Star Express logistics platform.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
