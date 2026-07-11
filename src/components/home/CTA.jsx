import React from "react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-section-gap-mobile sm:py-section-gap-tablet lg:py-section-gap px-5 sm:px-6 md:px-margin-desktop max-w-7xl mx-auto text-center">
      <div
        data-aos="fade-up"
        className="max-w-2xl mx-auto space-y-4 sm:space-y-6"
      >
        <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md">
          Ready to scale?
        </h2>
        <p className="font-body-base text-body-base-sm sm:text-body-base text-text-muted">
          Let's discuss your next technical challenge. From initial
          architectural planning to final deployment, I ensure precision at
          every step.
        </p>
        <div className="pt-4 sm:pt-6">
          <Link
            className="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary group"
            href="/contact"
          >
            INITIATE HANDSHAKE
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
