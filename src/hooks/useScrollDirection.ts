import { useState, useEffect } from "react";

type ScrollDirections = "down" | "up";

export default function useScrollDirection({
  initialDirection,
  thresholdPixels = 0,
}: {
  initialDirection?: ScrollDirections;
  thresholdPixels?: number;
} = {}) {
  const [scrollDir, setScrollDir] = useState(initialDirection);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let frameId = 0;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      ticking = false;

      if (Math.abs(scrollY - lastScrollY) <= thresholdPixels) {
        return;
      }

      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = Math.max(scrollY, 0);
    };

    const onScroll = () => {
      if (!ticking) {
        frameId = window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frameId);
    };
  }, [thresholdPixels]);

  return scrollDir;
}
