import React from "react";
import socials from "@/data/socials";
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
        <h2 className="font-display-lg text-[24px] sm:text-[36px] lg:text-display-lg text-text-primary mb-5 sm:mb-8 leading-tight">
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
      <div
        data-aos="fade-left"
        data-aos-duration="700"
        data-aos-delay="100"
        className="bg-surface-container-low border border-border-hairline p-4 sm:p-card-padding rounded-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-10">
          <span className="material-symbols-outlined text-[80px] sm:text-[120px]">
            send
          </span>
        </div>

        <form className="relative z-10 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
                Full Name
              </label>
              <input
                className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none"
                placeholder="John Doe"
                type="text"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
                Email
              </label>
              <input
                className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none"
                placeholder="john@example.com"
                type="email"
              />
            </div>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
              Subject
            </label>
            <select className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none">
              <option>New Project Inquiry</option>
              <option>Collaboration Request</option>
              <option>Consulting</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="font-label-caps text-label-caps-xs sm:text-label-caps text-text-muted">
              Message
            </label>
            <textarea
              className="w-full bg-canvas border border-border-hairline text-text-primary text-sm rounded focus:border-primary focus:ring-1 focus:ring-primary transition-all p-2.5 sm:p-3 outline-none resize-none"
              placeholder="Briefly describe your project..."
              rows="3"
            ></textarea>
          </div>

          <button
            className="w-full py-3 sm:py-4 bg-primary text-on-primary font-label-caps text-label-caps-xs sm:text-label-caps font-bold rounded uppercase tracking-widest glow-button shadow-lg"
            type="submit"
          >
            Initialize Connection
          </button>
        </form>
      </div>
    </section>
  );
}
