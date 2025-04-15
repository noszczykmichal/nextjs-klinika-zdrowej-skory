"use client";

/**
 * https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */
import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

const getInitialState = () => {
  const isRenderingOnServer = typeof window === "undefined";
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setPrefersReducedMotion(getInitialState);
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []);
  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
