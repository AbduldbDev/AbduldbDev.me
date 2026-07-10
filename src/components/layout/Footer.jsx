import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full mt-0 py-8 sm:py-12 border-t border-border-hairline bg-canvas dark:bg-canvas animate-[fadeUp_0.8s_ease-out]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-primary/30 blur-sm" />

      <div className="max-w-8xl mx-auto px-5 sm:px-6 md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left font-label-caps text-text-muted text-sm">
            © 2026 AbduldbDev. Built with precision.
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://github.com/AbduldbDev"
              target="_blank"
              className="group relative text-text-secondary hover:text-primary transition-all duration-300 hover:-translate-y-1"
            >
              GitHub
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="https://www.linkedin.com/in/abduldbdev/"
              target="_blank"
              className="group relative text-text-secondary hover:text-primary transition-all duration-300 hover:-translate-y-1"
            >
              LinkedIn
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
