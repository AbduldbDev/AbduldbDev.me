"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const CATEGORY_COLORS = {
  commission: "text-success border-success/30 bg-success/5",
  mini: "text-tertiary border-tertiary/30 bg-tertiary/5",
  personal: "text-primary border-primary/30 bg-primary/5",
  academic: "text-warning border-warning/30 bg-warning/5",
};

function Skeleton() {
  return (
    <main className="pt-16 pb-24 animate-pulse">
      <section className="flex flex-col items-center px-5 py-24 text-center">
        <div className="w-24 h-6 bg-surface-elevated rounded-full mb-6" />
        <div className="w-80 h-10 bg-surface-elevated rounded mb-4" />
        <div className="w-96 h-5 bg-surface-elevated rounded mb-2" />
        <div className="w-72 h-5 bg-surface-elevated rounded mb-10" />
        <div className="w-full max-w-4xl aspect-video bg-surface-elevated rounded-xl" />
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
      <span className="material-symbols-outlined text-[48px] text-text-muted mb-4">
        folder_off
      </span>
      <h1 className="font-headline-md text-headline-md text-text-primary mb-2">
        Project not found
      </h1>
      <p className="text-text-muted text-sm mb-6">
        No document matches this ID.
      </p>
      <a
        href="/projects"
        className="font-label-caps text-label-caps text-primary border border-primary/30 px-6 py-2 rounded-full hover:bg-primary/10 transition-colors"
      >
        ← Back to Projects
      </a>
    </main>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects-new", slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setMissing(true);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setMissing(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <Skeleton />;
  if (missing || !project) return <NotFound />;

  const badgeColor =
    CATEGORY_COLORS[project.category] ??
    "text-text-muted border-border-hairline bg-surface-card";
  const stack = project.stack ?? project.TechStack ?? [];
  const overview = project.overview ?? [];
  const problems = project.problems ?? [];
  const solutions = project.solutions ?? [];
  const features = project.features ?? [];
  const screenshots = project.screenshots ?? [];

  return (
    <main className="pt-5 sm:pt-10 pb-24 overflow-x-hidden">
      {}
      <section className="relative flex flex-col items-center justify-center px-5 sm:px-6 md:px-margin-desktop pb-7 sm:pb-20 pt-16 sm:pt-24 text-center overflow-hidden w-full">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto" data-aos="fade-up">
          <span
            className={`inline-block mb-4 px-3 py-1 border rounded-full font-label-caps text-label-caps-xs sm:text-label-caps tracking-widest uppercase ${badgeColor}`}
          >
            {project.category}
          </span>

          <h1 className="font-display-lg text-[32px] font-bold sm:text-display-lg-mobile md:text-display-lg text-text-primary mb-4 sm:mb-6 leading-tight">
            {project.Title}
          </h1>

          <p className="font-body-lg text-body-lg-sm sm:text-body-lg text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-2 sm:py-4 bg-primary text-on-primary font-label-caps text-label-caps-xs sm:text-label-caps rounded font-bold hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  rocket_launch
                </span>
                Live Demo
              </a>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-2 sm:py-4 border border-border-hairline text-text-primary font-label-caps text-label-caps-xs sm:text-label-caps rounded hover:border-primary transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  code
                </span>
                View on GitHub
              </a>
            )}
          </div>
        </div>

        {project.heroImage && (
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="relative mt-5 sm:mt-16 w-full max-w-5xl mx-auto "
          >
            <div className="relative rounded-xl overflow-hidden border border-border-hairline shadow-2xl group">
              <img
                src={project.heroImage}
                alt={project.Title}
                className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-canvas via-transparent to-transparent opacity-30 pointer-events-none" />
            </div>
          </div>
        )}
      </section>

      {}
      {(overview.length > 0 || problems.length > 0) && (
        <section className=" pb-10 px-5 sm:px-6 md:px-margin-desktop max-w-7xl mx-auto">
          <div className="flex flex-col gap-10">
            {overview.length > 0 && (
              <div
                data-aos="fade-right"
                className="md:col-span-7 glass-card p-5 sm:p-card-padding rounded-xl"
              >
                <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md mb-4 sm:mb-6 text-primary">
                  Overview
                </h2>
                <div className="space-y-4">
                  {overview.map((para, i) => (
                    <p
                      key={i}
                      className="font-body-base text-body-base-sm sm:text-body-base text-text-secondary leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {problems.length > 0 && (
              <div
                data-aos="fade-left"
                data-aos-delay="100"
                className="md:col-span-5 bg-surface-card border border-border-hairline p-5 sm:p-card-padding rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-error material-symbols-outlined text-[28px]">
                    warning
                  </span>
                  <h2 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm">
                    The Problem
                  </h2>
                </div>
                <ul className="space-y-3">
                  {problems.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 font-body-base text-body-base-sm sm:text-body-base text-text-secondary"
                    >
                      <span className="text-error shrink-0 material-symbols-outlined text-[16px] mt-0.5">
                        close
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {}
      {(solutions.length > 0 || project.codeSnippet) && (
        <section className="py-12 sm:py-20 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-start w-full">
            {solutions.length > 0 && (
              <div data-aos="fade-right">
                <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md mb-6 sm:mb-8">
                  The Solution
                </h2>
                <div className="space-y-4">
                  {solutions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
                    >
                      <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <div>
                        <p className="font-headline-sm text-[15px] sm:text-[18px] text-text-primary mb-1">
                          {s.title}
                        </p>
                        {s.body && (
                          <p className="font-body-base text-[13px] sm:text-[14px] text-text-muted">
                            {s.body}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.codeSnippet && (
              <div
                data-aos="fade-left"
                data-aos-delay="100"
                className="relative w-full min-w-0"
              >
                <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
                <div className="relative glass-card p-4 rounded-xl border-primary/30 sm:rotate-1 w-full min-w-0">
                  <div className="flex items-center gap-2 mb-4 border-b border-border-hairline pb-2">
                    <div className="w-3 h-3 rounded-full bg-error shrink-0" />
                    <div className="w-3 h-3 rounded-full bg-warning shrink-0" />
                    <div className="w-3 h-3 rounded-full bg-success shrink-0" />
                    <span className="ml-3 font-label-caps text-[10px] text-text-muted truncate">
                      {project.snippetFile || "snippet"}
                    </span>
                  </div>
                  <div className="overflow-hidden w-full">
                    <pre className="text-[11px] sm:text-[12px] font-mono text-secondary-fixed-dim leading-relaxed whitespace-pre">
                      {project.codeSnippet}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {}
      {(features.length > 0 || stack.length > 0) && (
        <section className="py-12 sm:py-20 px-5 sm:px-6 md:px-margin-desktop max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
            {features.length > 0 && (
              <div data-aos="fade-right">
                <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md mb-6">
                  Core Features
                </h2>
                <div className="space-y-3">
                  {features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <span className="material-symbols-outlined text-primary text-[18px] sm:text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        <span className="text-text-primary font-medium">
                          {f.title}
                        </span>
                        {f.body ? ` — ${f.body}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stack.length > 0 && (
              <div data-aos="fade-left" data-aos-delay="100">
                <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md mb-6">
                  Tech Stack
                </h2>
                <div className="glass-card p-5 sm:p-8 rounded-2xl border border-primary/10 hover:border-primary/20 transition-colors">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {stack.map((tech, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/5 rounded-xl border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all font-label-caps text-[10px] sm:text-label-caps text-text-secondary"
                      >
                        <span className="material-symbols-outlined text-primary text-[14px] sm:text-[16px]">
                          deployed_code
                        </span>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {}
      {screenshots.length > 0 && (
        <section className="py-12 sm:py-20 px-5 sm:px-6 md:px-margin-desktop max-w-7xl mx-auto">
          <div
            data-aos="fade-up"
            className="flex items-end justify-between mb-8 sm:mb-10"
          >
            <h2 className="font-headline-md text-headline-md-sm sm:text-headline-md">
              Interface Exploration
            </h2>
            <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-widest">
              {screenshots.length} Screens
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {screenshots.map((img, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="group relative aspect-video overflow-hidden rounded-xl border border-border-hairline bg-surface"
              >
                <img
                  src={img}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
