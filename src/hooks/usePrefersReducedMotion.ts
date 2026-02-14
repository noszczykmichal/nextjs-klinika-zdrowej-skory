"use client";

import { useState, useEffect } from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

export default function usePrefersReducedMotion() {
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return true;
    }

    return !window.matchMedia(QUERY).matches;
  };

  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState());

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);
  return prefersReducedMotion;
}
