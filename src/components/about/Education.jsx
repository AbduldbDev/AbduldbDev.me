import React from "react";
import education from "@/data/education";
export default function Education() {
  return (
    <section className="mt-12 sm:mt-20 lg:mt-30 pb-16 sm:pb-24">
      <div>
        <div
          data-aos="fade-up"
          className="flex items-end justify-between mb-8 sm:mb-12"
        >
          <div>
            <h2 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm text-text-primary">
              Education
            </h2>
            <p className="text-text-muted mt-1 sm:mt-2 text-sm sm:text-base">
              The academic foundation and professional training that shaped my
              journey.
            </p>
          </div>
          <div className="h-px grow mx-8 bg-border-hairline mb-4 hidden md:block" />
        </div>

        <div className="space-y-8 px-5">
          {education.map((data, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className={`border-l-2 pl-6 ${index === 0 ? `border-primary` : `border-border-hairline`}`}
            >
              <h4 className="font-body-lg  label-caps md:text-body-lg text-text-primary font-semibold">
                {data.degree}
              </h4>

              <p className="md:text-text-secondary text-[12px]">
                {data.school} • {data.year}
              </p>

              <p className="text-text-muted text-sm mt-2 italic">
                {data.special ?? ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
