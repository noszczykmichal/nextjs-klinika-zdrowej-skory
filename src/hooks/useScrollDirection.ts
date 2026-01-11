import { useState, useEffect } from "react";

type ScrollDirections = "down" | "up";

export default function useScrollDirection({
  initialDirection = "down",
  thresholdPixels = 0,
  off,
}: {
  initialDirection?: ScrollDirections;
  thresholdPixels?: number;
  off?: boolean;
} = {}) {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    if (off) {
      return;
    }

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < thresholdPixels) {
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

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPixels, off]);

  return off ? initialDirection : scrollDir;
}
