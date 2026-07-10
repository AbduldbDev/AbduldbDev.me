"use client";

import { useEffect, useState } from "react";
import { fetchCerts } from "@/data/certifications";

const CATEGORY_ORDER = ["Professional", "Seminar", "Participation"];

const CATEGORY_META = {
  Professional: {
    label: "Professional Certification",
    description: "Industry-recognized professional certifications.",
  },
  Seminar: {
    label: "Seminar Certificates",
    description: "Seminars and technical training programs attended.",
  },
  Participation: {
    label: "Certificates of Participation",
    description: "Events, competitions, and community activities.",
  },
};

export default function Certifications() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchCerts();
      setCerts(data);
    };

    loadData();
  }, []);

  // Helper function to parse date strings like "August 2025" or "2025"
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0); // Return epoch for missing dates

    // Try parsing as "Month Year" format
    const monthYearMatch = dateStr.match(/^(\w+)\s+(\d{4})$/);
    if (monthYearMatch) {
      const [, month, year] = monthYearMatch;
      return new Date(`${month} 1, ${year}`);
    }

    // Try parsing as just year "2025"
    const yearMatch = dateStr.match(/^(\d{4})$/);
    if (yearMatch) {
      return new Date(`January 1, ${yearMatch[1]}`);
    }

    // Fallback: try parsing as-is
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  };

  // Group certs by category, defaulting to "Professional" if missing
  const grouped = certs.reduce((acc, cert) => {
    const cat = cert.category || "Professional";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(cert);
    return acc;
  }, {});

  // Sort each category by date (newest first), then alphabetically by title
  Object.keys(grouped).forEach((cat) => {
    grouped[cat].sort((a, b) => {
      const dateA = parseDate(a.year);
      const dateB = parseDate(b.year);

      // First, sort by date (newest first)
      const dateDiff = dateB - dateA;
      if (dateDiff !== 0) return dateDiff;

      // If dates are the same, sort alphabetically by title
      const titleA = (a.title || a.image || "").toLowerCase();
      const titleB = (b.title || b.image || "").toLowerCase();
      return titleA.localeCompare(titleB);
    });
  });

  const availableCategories = CATEGORY_ORDER.filter(
    (cat) => grouped[cat]?.length > 0,
  );

  return (
    <section className="mb-10 sm:mb-section-gap">
      {/* Category Sections */}
      <div className="flex flex-col gap-12 sm:gap-16">
        {availableCategories.map((cat) => {
          const meta = CATEGORY_META[cat] || {
            label: cat,
            description: "",
          };
          const categoryCerts = grouped[cat] || [];

          return (
            <div key={cat}>
              {/* Category Header */}
              <div
                data-aos="fade-up"
                className="flex items-end justify-between mb-6 sm:mb-8 gap-4"
              >
                <div className="flex items-center gap-3 min-w-0 shrink">
                  <div className="min-w-0">
                    <h3 className="font-headline-sm text-lg sm:text-xl text-text-primary">
                      {meta.label}
                    </h3>
                    <p className="text-text-muted text-sm mt-0.5">
                      {meta.description}
                    </p>
                  </div>
                </div>
                <div className="h-px grow mx-4 sm:mx-8 bg-border-hairline hidden md:block" />
                <span className="text-xs text-text-muted border border-border-hairline rounded-full px-2.5 py-1 shrink-0 whitespace-nowrap">
                  {categoryCerts.length}{" "}
                  {categoryCerts.length === 1 ? "certificate" : "certificates"}
                </span>
              </div>

              {/* Certificates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-gutter">
                {categoryCerts.map((cert, index) => (
                  <div
                    key={cert.id ?? index}
                    data-aos="fade-up"
                    data-aos-delay={index * 150}
                    className="border border-border-hairline bg-surface-container-lowest rounded-lg overflow-hidden hover:border-primary/30 transition-all group cursor-pointer"
                  >
                    {/* Certificate Image - Standard landscape certificate ratio */}
                    <div
                      className="w-full relative overflow-hidden bg-surface-container"
                      style={{ aspectRatio: "1.414 / 1" }}
                    >
                      {cert.Img && (
                        <img
                          src={cert.Img}
                          alt={cert.title || cert.image}
                          className="w-full h-full object-contain"
                        />
                      )}
                      {/* Hover overlay */}
                      <div
                        className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity
                                      flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-white text-2xl">
                          open_in_new
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-3 sm:p-4 border-t border-border-hairline">
                      <div className="flex flex-col gap-1.5 mb-2.5">
                        <div className="font-label-caps tracking-widest text-[10px] text-primary">
                          {cert.year}
                        </div>
                        {cert.provider && (
                          <div className="font-label-caps tracking-wide text-[9px] text-text-muted uppercase truncate">
                            {cert.provider}
                          </div>
                        )}
                      </div>
                      <h4 className="font-medium text-sm leading-snug text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                        {cert.title || cert.image}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
