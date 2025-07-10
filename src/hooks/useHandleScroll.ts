import { useEffect, useState } from "react";

export default function useHandleScroll() {
  const [scrolledToTop, setScrolledToTop] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setScrolledToTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrolledToTop;
}
