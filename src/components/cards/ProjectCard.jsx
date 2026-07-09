"use client";

const CATEGORY_COLORS = {
  commission: "text-success border-success/30 bg-success/5",
  Mmni: "text-tertiary border-tertiary/30 bg-tertiary/5",
  personal: "text-primary border-primary/30 bg-primary/5",
  academic: "text-warning border-warning/30 bg-warning/5",
  competition: "text-warning border-warning/30 bg-warning/5",
};

function formatDate(value) {
  if (!value) return "";
  if (value?.seconds) {
    return new Date(value.seconds * 1000).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  return String(value);
}

export default function ProjectCard({ project }) {
  const badgeColor =
    CATEGORY_COLORS[project.category] ||
    "text-text-muted border-border-hairline bg-surface-card";

  return (
    <div
      className="project-card group relative bg-surface-card rounded-xl border border-border-hairline p-card-padding transition-all duration-500 hover:border-primary/25 overflow-hidden h-full flex flex-col"
      data-category={project.category}
    >
      {/* 16:9 image */}
      <div className="-mx-card-padding -mt-card-padding mb-5 overflow-hidden border-b border-border-hairline aspect-video shrink-0">
        <img
          alt={project.Title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.Img || "/placeholder.png"}
        />
      </div>

      {/* Glow overlay */}
      <div className="glow-effect absolute -inset-px bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none" />

      {/* Badge + date */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`font-label-caps text-[10px] tracking-widest uppercase border px-2.5 py-0.5 rounded ${badgeColor}`}
        >
          {project.category}
        </span>
        <span className="text-[11px] text-text-muted">
          {formatDate(project.Date)}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-headline-sm text-[15px] leading-snug mb-2">
        {project.Title}
      </h3>

      {/* Description */}
      <p className="text-[12px] leading-relaxed text-text-secondary mb-4 line-clamp-3 grow">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-white/5 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-label-caps border border-border-hairline"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border-hairline flex items-center justify-between">
        <a
          href={`/projects/${project.id}`}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-label-caps tracking-widest uppercase text-text-secondary border border-border-hairline rounded px-3 py-1.5 hover:border-primary hover:text-text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[14px]">
            folder_open
          </span>
          View project
        </a>

        {project.Link && project.Link !== "None" ? (
          <a
            href={project.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] font-label-caps tracking-widest uppercase text-primary hover:text-text-primary transition-colors"
          >
            View Demo
            <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-label-caps tracking-widest uppercase text-text-secondary cursor-not-allowed">
            No Demo Link
          </span>
        )}
      </div>
    </div>
  );
}
