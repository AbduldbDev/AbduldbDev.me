import React from "react";

export default function ReviewCard({ data, index }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="glass-card p-4 sm:p-6 rounded-xl flex flex-col gap-3 sm:gap-4"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex flex-col min-w-0">
          <h3 className="font-headline-sm text-base sm:text-[18px] text-text-primary leading-tight">
            {data.userName}
          </h3>

          <p className="font-body-base text-xs sm:text-sm text-text-muted">
            {data.position}
          </p>
        </div>

        <div className="flex shrink-0">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-sm sm:text-[16px] text-yellow-400"
              style={{
                fontVariationSettings: `'FILL' ${i < data.rate ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
              }}
            >
              star
            </span>
          ))}
        </div>
      </div>

      <p className="font-body-base text-sm sm:text-base text-text-secondary italic leading-relaxed">
        "{data.content}"
      </p>
    </div>
  );
}
