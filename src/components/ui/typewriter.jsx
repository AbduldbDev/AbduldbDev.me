"use client";
import { useState, useEffect } from "react";

const TITLES = ["Full-Stack Web Developer", "Software Engineer"];
const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

export function useTypewriter(phrases) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];

    if (!isDeleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((i) => i + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIndex === current.length) {
      const t = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((i) => i - 1), DELETE_SPEED);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIndex === 0) {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, PAUSE_AFTER_DELETE);
      return () => clearTimeout(t);
    }
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  useEffect(() => {
    setDisplayed(phrases[phraseIndex].slice(0, charIndex));
  }, [charIndex, phraseIndex, phrases]);

  return { displayed, phraseIndex };
}

export default function TypewriterHeading() {
  const { displayed, phraseIndex } = useTypewriter(TITLES);
  const isTechnical = phraseIndex === 1;

  return (
    <h2 className="font-display-lg text-[20px] font-semibold sm:text-display-lg-sm md:text-display-lg-mobile lg:text-display-md leading-tight">
      <span className={isTechnical ? "text-primary" : ""}>{displayed}</span>
      <span
        className="inline-block w-0.5 h-[1em] ml-1 align-middle bg-primary animate-[blink_0.8s_step-end_infinite]"
        aria-hidden="true"
      />
    </h2>
  );
}
