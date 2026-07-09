import Image from "next/image";
export default function Biography() {
  return (
    <section className="py-20 sm:py-20 lg:py-30">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 lg:gap-gutter items-center">
        {/* Content */}
        <div
          data-aos="fade-right"
          data-aos-duration="700"
          className="md:col-span-7 order-2 md:order-1 text-center md:text-left"
        >
          <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-primary tracking-widest block mb-3 sm:mb-4">
            FULL-STACK WEB DEVELOPER
          </span>

          <h1 className="font-display-lg text-[26px] sm:text-[36px] md:text-[40px] lg:text-display-md font-bold text-text-primary mb-4 sm:mb-6">
            Building Modern Web Applications with{" "}
            <span className="text-primary italic">Precision</span>.
          </h1>

          <p className="font-body-lg text-[14px] sm:text-base lg:text-body-lg text-text-secondary max-w-2xl mx-auto md:mx-0">
            I'm Abdul Aziz A. De Borja, a Full-Stack Web Developer from Laguna,
            Philippines. I design and develop scalable web applications using
            Laravel, React, and modern JavaScript technologies, transforming
            complex business requirements into reliable, production-ready
            software with clean architecture and intuitive user experiences.
          </p>

          <div className="relative bg-gradient-to-br from-[#adc6ff]/5 via-transparent to-[#adc6ff]/10 border border-[#adc6ff]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 my-4 sm:my-6 backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="absolute top-2 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-[#adc6ff]/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-2 w-8 h-8 sm:w-12 sm:h-12 bg-[#adc6ff]/15 rounded-full blur-lg" />
            <div className="absolute top-2 sm:top-3 left-3 sm:left-4 text-[#adc6ff] opacity-30">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
            </div>
            <blockquote className="text-[#adc6ff] text-center lg:text-left italic font-medium text-xs sm:text-sm relative z-10 pl-4 sm:pl-6">
              "Code is like a humor. When you have to explain it, it’s bad." -
              <i>Cory House</i>
            </blockquote>
          </div>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-hairline rounded-full">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span className="font-label-caps text-label-caps text-text-primary uppercase">
                Available for Work
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-border-hairline rounded-full">
              <span className="material-symbols-outlined text-primary">
                location_on
              </span>
              <span className="font-label-caps text-label-caps text-text-primary uppercase">
                Laguna, Philippines
              </span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay="100"
          className="md:col-span-5 order-1 md:order-2 flex justify-center"
        >
          <div className="group w-full max-w-xs sm:max-w-sm md:max-w-none aspect-square rounded-2xl overflow-hidden border border-border-hairline glass-card p-4">
            <img
              src="/Image.jpg"
              alt="Professional portrait"
              className="w-full h-full object-cover rounded-xl grayscale hover:filter-none transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
