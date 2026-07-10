import React from "react";
import ExpCard from "../cards/ExpCard";
import experience from "@/data/experience";
export default function Experience() {
  return (
    <section className="mb-16 sm:mb-section-gap mt-0 lg:mt-20">
      {/* Section Header */}
      <div
        data-aos="fade-up"
        className="flex items-end justify-between mb-8 sm:mb-12"
      >
        <div>
          <h2 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm text-text-primary">
            Professional Experience
          </h2>
          <p className="text-text-muted mt-1 sm:mt-2 text-sm sm:text-base">
            A journey across freelance, enterprise, and public sector projects,
            delivering scalable software solutions.
          </p>
        </div>
        <div className="h-px grow mx-8 bg-border-hairline mb-4 hidden md:block" />
      </div>

      <div className="relative space-y-5 lg:space-y-12">
        <div className="absolute left-6 top-2 bottom-2 timeline-line hidden md:block lg:block xl:block"></div>

        {experience.map((data, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 80}
            className="relative pl-0 md:pl-20 group"
          >
            <div className="absolute left-4 top-1 w-4 h-4 bg-primary rounded-full border-4 border-canvas z-10 hidden md:block group-hover:scale-125 transition-transform"></div>
            <ExpCard data={data} />
          </div>
        ))}
      </div>
    </section>
  );
}
