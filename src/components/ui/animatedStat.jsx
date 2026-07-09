"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedStat({ value, suffix = "", duration = 1000 }) {
  const [display, setDisplay] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [cycle, setCycle] = useState(0);
  const ref = useRef(null);

  // Start once when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Restart every 10 seconds
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setCycle((c) => c + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  // Animation
  useEffect(() => {
    if (!hasStarted) return;

    let timeout;
    const start = Date.now();

    const scrambleDuration = 250;

    const tick = () => {
      const elapsed = Date.now() - start;

      if (elapsed < scrambleDuration) {
        setDisplay(Math.floor(Math.random() * (value + 10)));
        timeout = setTimeout(tick, 50);
        return;
      }

      const adjustedProgress =
        (elapsed - scrambleDuration) / (duration - scrambleDuration);

      const eased = 1 - Math.pow(1 - Math.min(adjustedProgress, 1), 3);

      setDisplay(Math.round(value * eased));

      if (adjustedProgress < 1) {
        const delay = 16 + adjustedProgress * 80;
        timeout = setTimeout(tick, delay);
      } else {
        setDisplay(value);
      }
    };

    tick();

    return () => clearTimeout(timeout);
  }, [hasStarted, cycle, value, duration]);

  return (
    <span
      ref={ref}
      className="font-display-lg text-3xl sm:text-4xl text-text-primary mb-1 sm:mb-2"
    >
      {display}
      {suffix}
    </span>
  );
}
