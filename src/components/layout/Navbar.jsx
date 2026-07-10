"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Expertise", href: "/expertise" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-canvas/70 border-b border-border-hairline backdrop-blur-xl animate-[slideDown_0.6s_ease-out]">
      <div className="flex justify-between items-center h-14 sm:h-16 px-4 sm:px-6 md:px-margin-desktop max-w-8xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="font-headline-sm text-[18px] sm:text-headline-sm font-bold text-text-primary"
        >
          Abduldb<span className="text-primary">Dev</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-6 xl:gap-gutter items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative  text-[15px] lg:font-label-caps transition-colors duration-300 ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-text-secondary hover:text-text-primary after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden lg:block bg-surface-card border border-primary text-primary px-5 xl:px-8 py-1 rounded-full font-label-caps text-[11px] xl:text-label-caps transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_25px_rgba(173,198,255,0.25)] active:scale-95 whitespace-nowrap"
        >
          Hire Me
        </Link>

        {/* Mobile/Tablet Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center justify-center text-text-primary"
          aria-label="Toggle menu"
        >
          <span
            className={`material-symbols-outlined transition-all duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            {isOpen ? "☰" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 border-t border-border-hairline"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-canvas/95 backdrop-blur-xl px-4 py-5 flex flex-col gap-4">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`transition-all duration-300 ${
                  isActive
                    ? "text-primary border-l-2 border-primary pl-3"
                    : "text-text-secondary hover:text-text-primary"
                } ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 75}ms`,
                }}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className={`text-center mt-2 w-full bg-surface-card border border-primary text-primary py-2 rounded-full transition-all duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{
              transitionDelay: "300ms",
            }}
          >
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
