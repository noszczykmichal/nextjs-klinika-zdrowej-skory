import { useState, useEffect } from "react";

type ScrollDirections = "down" | "up";

export default function useScrollDirection({
  initialDirection,
  thresholdPixels,
  off,
}: {
  initialDirection?: ScrollDirections;
  thresholdPixels?: number;
  off?: boolean;
} = {}) {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    const threshold = thresholdPixels || 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        // We haven't exceeded the threshold
        ticking = false;
        return;
      }

      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    /**
     * Bind the scroll handler if `off` is set to false.
     * If `off` is set to true reset the scroll direction.
     */
    if (!off) {
      window.addEventListener("scroll", onScroll);
    } else {
      setScrollDir(initialDirection);
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [initialDirection, thresholdPixels, off]);

  return scrollDir;
}
