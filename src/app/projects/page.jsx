"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import { fetchProjects } from "@/data/projects";

const filters = [
  { key: "all", label: "All Projects" },
  { key: "commission", label: "Commission" },
  { key: "mini", label: "Mini" },
  { key: "personal", label: "Personal" },
  { key: "academic", label: "Academic" },
  { key: "competition", label: "Competition" },
];

export default function ProjectsPage() {
  const [active, setActive] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 md:px-margin-desktop py-16 sm:py-24 lg:py-30">
      {/* Header */}
      <section className="mb-5 sm:mb-14">
        <div data-aos="fade-up">
          <h1 className="font-display-lg text-[32px] sm:text-[40px] md:text-[50px] font-bold text-text-primary">
            Selected <span className="text-primary">Works</span>
          </h1>
          <p className="font-body-lg text-body-lg-sm sm:text-body-lg text-text-secondary max-w-2xl mt-3">
            A collection of projects I've built, from large-scale logistics
            platforms to smaller tools designed to solve real-world problems.
            Each one reflects my focus on creating reliable, user-friendly, and
            thoughtfully designed software.
          </p>
        </div>
      </section>

      {/* Filter bar — horizontally scrollable on mobile */}
      <div data-aos="fade-up" data-aos-delay="50" className="mb-10 sm:mb-12">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pt-1 pb-3 border-b border-border-hairline">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`
                shrink-0 px-4 py-2 rounded-full text-[9px] sm:text-label-caps font-semibold
                tracking-widest uppercase transition-all duration-200 whitespace-nowrap
                ${
                  active === key
                    ? "bg-primary/10 border border-primary text-primary"
                    : "border border-border-hairline text-text-muted hover:text-text-primary hover:border-outline"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
        {/* Count indicator */}
        <p className="text-[11px] text-text-muted mt-3 font-label-caps tracking-widest">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          {active !== "all" && (
            <span className="ml-1 text-primary">
              · {filters.find((f) => f.key === active)?.label}
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton placeholders
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-border-hairline bg-surface-card overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-surface-elevated" />
                <div className="p-card-padding space-y-3">
                  <div className="h-3 w-20 bg-surface-elevated rounded" />
                  <div className="h-4 w-3/4 bg-surface-elevated rounded" />
                  <div className="h-3 w-full bg-surface-elevated rounded" />
                  <div className="h-3 w-5/6 bg-surface-elevated rounded" />
                </div>
              </div>
            ))
        ) : filtered.length > 0 ? (
          filtered.map((data, index) => (
            <div
              key={data.id || index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ProjectCard project={data} />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-text-muted font-label-caps tracking-widest">
            No projects found.
          </div>
        )}
      </div>
    </main>
  );
}
