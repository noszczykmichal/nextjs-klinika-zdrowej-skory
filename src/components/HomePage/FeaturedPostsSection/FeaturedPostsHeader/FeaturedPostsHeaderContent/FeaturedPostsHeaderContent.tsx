"use client";

import { useRef } from "react";

import useScrollReveal from "@/hooks/useScrollReveal";

export default function FeaturedPostsHeaderContent() {
  const revealItem = useRef<HTMLElement>(null);
  useScrollReveal(revealItem, 200, 1);

  return (
    <header ref={revealItem}>
      <h2 className="text-center text-[28px] lg:text-[54px]">Nasz blog</h2>
      <h3 className="text-center text-[15px] lg:text-[16px] uppercase text-[var(--magenta-100)]">
        O kosmetologii i medycynie estetycznej
      </h3>
    </header>
  );
}
