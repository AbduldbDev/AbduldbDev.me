"use client";
import React from "react";

// ─── Tech Stack Data ────────────────────────────────────────────────────────

const TECH_STACK = {
  languages: [
    { icon: "html.svg", label: "HTML" },
    { icon: "css.svg", label: "CSS" },
    { icon: "javascript.svg", label: "JavaScript" },
    { icon: "typescript.svg", label: "TypeScript" },
    { icon: "php.svg", label: "PHP 8.x" },
    { icon: "sass.svg", label: "SASS" },
    { icon: "java.svg", label: "Java" },
    { icon: "python.svg", label: "Python" },
  ],

  frontend: [
    { icon: "react.svg", label: "React" },
    { icon: "next.svg", label: "Next.js" },
    { icon: "vue.svg", label: "Vue" },
    { icon: "laravel.svg", label: "Blade" },
    { icon: "tailwind.svg", label: "Tailwind" },
    { icon: "bootstrap.svg", label: "Bootstrap" },
  ],

  mobile: [
    { icon: "react.svg", label: "React Native" },
    { icon: null, label: "Jetpack Compose", fallback: "android" },
    { icon: null, label: "Android Studio", fallback: "smartphone" },
    { icon: null, label: "Arduino Uno", fallback: "memory" },
  ],

  backend: {
    logic: [
      { icon: "laravel.svg", label: "Laravel" },
      { icon: "node.svg", label: "Node.js" },
      { icon: "express.svg", label: "Express" },
    ],
    persistence: [
      { icon: "postgresql.svg", label: "PostgreSQL" },
      { icon: "mysql.svg", label: "MySQL" },
      { icon: "mongodb.svg", label: "MongoDB" },
      { icon: "firebase.svg", label: "Firebase" },
    ],
  },

  cloud: [
    { icon: "vercel.svg", label: "Vercel" },
    { icon: "aws.svg", label: "AWS" },
    { icon: "azure.svg", label: "Azure" },
    { icon: null, label: "Hostinger", fallback: "dns" },
    { icon: null, label: "Salesforce", fallback: "cloud" },
  ],

  workflow: [
    { icon: "git.svg", label: "Git" },
    { icon: "github.svg", label: "GitHub" },
    { icon: "postman.svg", label: "Postman" },
    { icon: "jira.svg", label: "Jira" },
    { icon: "figma.svg", label: "Figma" },
    { icon: null, label: "VS Code", fallback: "code" },
    { icon: null, label: "Kiro", fallback: "assistant_navigation" },
  ],

  methodologies: [
    "REST APIs",
    "MVC Pattern",
    "OAuth / JWT",
    "CI/CD Pipelines",
    "Agile Method",
    "Waterfall",
  ],
};

// ─── Icon tint: #adc6ff ──────────────────────────────────────────────────────
const PRIMARY_FILTER =
  "invert(83%) sepia(22%) saturate(800%) hue-rotate(190deg) brightness(105%)";

const TechIcon = ({ name, size = 28 }) => (
  <img
    src={`/TechStack/${name}`}
    alt=""
    aria-hidden="true"
    width={size}
    height={size}
    style={{
      filter: PRIMARY_FILTER,
      objectFit: "contain",
      display: "block",
      flexShrink: 0,
    }}
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
);

const FallbackIcon = ({ name, size = 24 }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: size, color: "#adc6ff", lineHeight: 1, flexShrink: 0 }}
  >
    {name}
  </span>
);

const Icon = ({ icon, fallback, size = 28 }) =>
  icon ? (
    <TechIcon name={icon} size={size} />
  ) : (
    <FallbackIcon name={fallback} size={size} />
  );

/** Icon stacked above label */
const PillCard = ({ icon, fallback, label }) => (
  <div
    className="tech-chip group rounded-xl flex flex-col items-center justify-center gap-3 p-4 text-center"
    style={{ minHeight: 90 }}
  >
    <Icon icon={icon} fallback={fallback} size={32} />
    <span className="font-label-caps text-label-caps text-text-secondary leading-none transition-colors duration-200 group-hover:text-primary">
      {label}
    </span>
  </div>
);

/** Icon left of label */
const RowChip = ({ icon, fallback, label, iconSize = 22 }) => (
  <span className="tech-chip group px-3 py-2 rounded-lg font-label-caps text-label-caps flex items-center gap-2.5">
    <Icon icon={icon} fallback={fallback} size={iconSize} />
    {label}
  </span>
);

// ─── Section header ───────────────────────────────────────────────────────────

const SectionHeader = ({ icon, children }) => (
  <div className="flex items-center gap-2 mb-4 sm:mb-6">
    <span className="material-symbols-outlined text-primary">{icon}</span>
    <h3 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm text-text-primary">
      {children}
    </h3>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BentoGrid() {
  return (
    <section className="mb-10 sm:mb-section-gap grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-gutter">
      {/* ── Frontend ───────────────────────────── col-span-4 */}
      <div
        data-aos="fade-up"
        data-aos-delay="0"
        className="md:col-span-4 glass-card p-4 sm:p-card-padding rounded-xl"
      >
        <SectionHeader icon="web">Frontend</SectionHeader>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3">
          {TECH_STACK.frontend.map(({ icon, label }) => (
            <PillCard key={label} icon={icon} label={label} />
          ))}
        </div>
      </div>

      {/* ── Languages ────────────────── col-span-8 */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="md:col-span-8 glass-card p-4 sm:p-card-padding rounded-xl"
      >
        <SectionHeader icon="code">Languages</SectionHeader>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {TECH_STACK.languages.map(({ icon, label, fallback }) => (
            <PillCard
              key={label}
              icon={icon}
              fallback={fallback}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* ── Backend & Data ───────────────────────── col-span-7 */}
      <div
        data-aos="fade-up"
        data-aos-delay="0"
        className="md:col-span-7 glass-card p-4 sm:p-card-padding rounded-xl"
      >
        <SectionHeader icon="storage">Backend &amp; Data</SectionHeader>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-widest text-xs">
              Logic
            </span>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.backend.logic.map(({ icon, label }) => (
                <RowChip key={label} icon={icon} label={label} iconSize={22} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-widest text-xs">
              Persistence
            </span>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.backend.persistence.map(({ icon, label }) => (
                <RowChip key={label} icon={icon} label={label} iconSize={22} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Cloud Delivery ───────────────────────── col-span-5 */}
      <div
        data-aos="fade-up"
        data-aos-delay="100"
        className="md:col-span-5 glass-card p-4 sm:p-card-padding rounded-xl"
      >
        <SectionHeader icon="cloud_done">Cloud Delivery</SectionHeader>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {TECH_STACK.cloud.map(({ icon, label, fallback }) => (
            <PillCard
              key={label}
              icon={icon}
              fallback={fallback}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile & Hardware ────────────────────── col-span-12 */}
      <div
        data-aos="fade-up"
        className="md:col-span-12 glass-card p-4 sm:p-card-padding rounded-xl"
      >
        <SectionHeader icon="smartphone">Mobile &amp; Hardware</SectionHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {TECH_STACK.mobile.map(({ icon, label, fallback }) => (
            <PillCard
              key={label}
              icon={icon}
              fallback={fallback}
              label={label}
            />
          ))}
        </div>
      </div>

      {/* ── Workflow & Methodologies ─────────────── col-span-12 */}
      <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-gutter">
        <div
          data-aos="fade-right"
          className="glass-card p-4 sm:p-card-padding rounded-xl"
        >
          <h4 className="font-label-caps text-label-caps text-primary mb-4 tracking-widest uppercase">
            Workflow &amp; Design
          </h4>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.workflow.map(({ icon, fallback, label }) => (
              <RowChip
                key={label}
                icon={icon}
                fallback={fallback}
                label={label}
                iconSize={20}
              />
            ))}
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="glass-card p-4 sm:p-card-padding rounded-xl"
        >
          <h4 className="font-label-caps text-label-caps text-primary mb-4 tracking-widest uppercase">
            Methodologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.methodologies.map((label) => (
              <span
                key={label}
                className="tech-chip px-4 py-2 rounded-lg font-label-caps text-label-caps cursor-default"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
