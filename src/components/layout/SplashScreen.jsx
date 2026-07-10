"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, GitBranch, Globe, User, Sparkles } from "lucide-react";

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Floating particles effect
const FloatingParticle = ({ delay, duration, x, y, maxWidth }) => {
  // Clamp horizontal drift so particles never push the page into overflow
  const drift = Math.random() * 50 - 25;
  const clampedX = Math.min(Math.max(x + drift, 4), maxWidth - 4);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/30 rounded-full"
      initial={{ opacity: 0, x: x, y: y }}
      animate={{
        opacity: [0, 1, 0],
        y: [y, y - 100],
        x: [x, clampedX],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
};

// Animated grid background
const GridBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />
  </div>
);

const IconButton = ({ Icon, delay }) => (
  <motion.div
    className="relative group"
    initial={{ opacity: 0, y: -30, scale: 0.5 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.8, type: "spring", bounce: 0.5 }}
    whileHover={{ scale: 1.1, rotate: 5 }}
  >
    <div className="absolute -inset-3 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-300" />
    <div className="relative p-3 sm:p-4 bg-surface-container/50 backdrop-blur-sm rounded-2xl border border-primary/30 group-hover:border-primary/50 transition-all duration-300">
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 text-primary" />
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  </motion.div>
);

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [dimensions, setDimensions] = useState(null); // null until mounted client-side

  useEffect(() => {
    // window is only safe to touch inside useEffect (runs client-side only)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Drive progress from 0 -> 100 over the same duration as the splash screen
    const totalDuration = 4000; // ms, matches the setTimeout below
    const intervalMs = 30;
    const steps = totalDuration / intervalMs;
    const increment = 100 / steps;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, totalDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#060607] z-9999 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Grid Background */}
          <GridBackground />

          {/* Floating Particles — only render once we know the viewport size */}
          {dimensions &&
            [...Array(15)].map((_, i) => (
              <FloatingParticle
                key={i}
                delay={i * 0.3}
                duration={3 + Math.random() * 2}
                x={Math.random() * dimensions.width}
                y={dimensions.height - 100}
                maxWidth={dimensions.width}
              />
            ))}

          <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
            <div className="w-full max-w-4xl mx-auto">
              {/* Decorative sparkle top-left */}
              <motion.div
                className="absolute top-20 left-4 sm:left-20"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50" />
              </motion.div>

              {/* Decorative sparkle top-right */}
              <motion.div
                className="absolute top-32 right-4 sm:right-20"
                animate={{
                  rotate: -360,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-primary/40" />
              </motion.div>

              {/* Icons */}
              <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 mb-8 sm:mb-10 md:mb-14">
                <IconButton Icon={Code2} delay={0.2} />
                <IconButton Icon={User} delay={0.4} />
                <IconButton Icon={GitBranch} delay={0.6} />
              </div>

              {/* Welcome Text */}
              <motion.div
                className="text-center mb-8 sm:mb-10 md:mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold space-y-3 sm:space-y-4 break-words">
                  <div className="mb-3 sm:mb-4">
                    <motion.span
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="inline-block px-2 text-white"
                    >
                      Welcome
                    </motion.span>{" "}
                    <motion.span
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                      className="inline-block px-2 text-white"
                    >
                      To
                    </motion.span>{" "}
                    <motion.span
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      className="inline-block px-2 text-white"
                    >
                      My
                    </motion.span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                  >
                    <span className="inline-block px-2 text-primary drop-shadow-[0_0_20px_rgba(173,198,255,0.5)]">
                      Portfolio
                    </span>{" "}
                    <span className="inline-block px-2 text-primary drop-shadow-[0_0_20px_rgba(173,198,255,0.5)]">
                      Website
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <a
                  href="https://AbduldbDev.vercel.app"
                  className="inline-flex items-center gap-2 px-5 py-3 sm:px-7 sm:py-4 rounded-full relative group hover:scale-105 transition-transform duration-300 border border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 max-w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-base sm:text-lg md:text-xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                    <span className="text-primary font-medium truncate">
                      <TypewriterEffect text="AbduldbDev.vercel.app" />
                    </span>
                  </div>
                </a>
              </motion.div>

              {/* Loading Progress Bar */}
              <motion.div
                className="max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden border border-primary/20">
                    <motion.div
                      className="h-full bg-linear-to-r from-primary/50 via-primary to-primary/50 rounded-full relative"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.div>
                  </div>
                  <span className="text-primary text-sm font-mono min-w-[3ch]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <p className="text-text-muted text-xs text-center">
                  Initializing portfolio experience...
                </p>
              </motion.div>

              {/* Bottom decorative line */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/50"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
