"use client";

import { useRef, useEffect } from "react";
import ScrollReveal from "scrollreveal";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { scrollRevealConfig } from "@/utils/config";

export default function FeaturedPostsHeaderContent() {
  const revealItem = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const animatedElement = revealItem.current;

    if (!prefersReducedMotion && animatedElement) {
      ScrollReveal().reveal(animatedElement, scrollRevealConfig());
    }

    return () => {
      if (animatedElement) {
        ScrollReveal().clean(animatedElement);
        animatedElement.style.opacity = "1";
        animatedElement.style.transform = "none";
      }
    };
  }, [prefersReducedMotion]);

  return (
    <header ref={revealItem}>
      <h2 className="text-center text-[54px]">Nasz blog</h2>
      <h3 className="text-center uppercase text-[var(--magenta-100)]">
        O kosmetologii i medycynie estetycznej
      </h3>
    </header>
  );
}
