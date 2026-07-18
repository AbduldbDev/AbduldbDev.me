import React from "react";
import socials from "@/data/socials";
import ContactForm from "./ContactForm";

export default function contactSection() {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-section-gap items-start pt-6 sm:pt-12 z-10 pb-10 sm:pb-16"
      id="contact"
    >
      {/* Left — info */}
      <div data-aos="fade-right" data-aos-duration="700">
        <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-primary tracking-[0.2em] uppercase mb-3 sm:mb-4 block">
          Available for Hire
        </span>
        <h2 className="font-display-lg text-[24px] sm:text-[36px] font-bold lg:text-display-lg text-text-primary mb-5 sm:mb-8 leading-tight">
          Let's build the next <span className="text-primary">benchmark</span>.
        </h2>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-surface-card border border-border-hairline flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[24px] text-text-secondary group-hover:text-primary">
                mail
              </span>
            </div>
            <div>
              <p className="text-text-muted font-label-caps text-label-caps-xs sm:text-label-caps">
                Email Address
              </p>
              <p className="text-text-primary text-sm sm:text-body-lg">
                abduldbdev@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded bg-surface-card border border-border-hairline flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[24px] text-text-secondary group-hover:text-primary">
                location_on
              </span>
            </div>
            <div>
              <p className="text-text-muted font-label-caps text-label-caps-xs sm:text-label-caps">
                Current Location
              </p>
              <p className="text-text-primary text-sm sm:text-body-lg">
                Remote / Bay, Laguna
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap gap-3">
          {socials.map(({ icon, title, href }) => (
            <a
              key={title}
              className="relative group/tip w-9 h-9 sm:w-10 sm:h-10 border border-border-hairline rounded flex items-center justify-center text-text-muted hover:border-primary hover:text-primary transition-all"
              href={href}
              target={href !== "#" ? "_blank" : undefined}
              rel={href !== "#" ? "noopener noreferrer" : undefined}
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                {icon}
              </span>
              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface-elevated border border-border-hairline text-text-primary font-label-caps text-[10px] tracking-widest whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200">
                {title}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border-hairline" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Right — form */}
      <ContactForm />
    </section>
  );
}
