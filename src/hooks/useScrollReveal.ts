import { RefObject, useEffect } from "react";
import ScrollReveal from "scrollreveal";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { scrollRevealConfig } from "@/utils/config";

export default function useScrollReveal(
  revealItem: RefObject<HTMLElement | null>,
  delay: number = 200,
  viewFactor: number = 0.25,
) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const animatedElement = revealItem.current;

    if (!prefersReducedMotion && animatedElement) {
      ScrollReveal().reveal(
        animatedElement,
        scrollRevealConfig(delay, viewFactor),
      );
    }

    return () => {
      if (!prefersReducedMotion && animatedElement) {
        ScrollReveal().clean(animatedElement);
        animatedElement.style.opacity = "1";
        animatedElement.style.transform = "none";
      }
    };
  }, [prefersReducedMotion, revealItem, delay, viewFactor]);
}
