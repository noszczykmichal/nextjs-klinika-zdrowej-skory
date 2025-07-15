"use client";

import { RevealWrapper } from "next-reveal";

export default function FeaturedPostsHeader() {
  return (
    <RevealWrapper
      origin="bottom"
      distance="20px"
      duration={500}
      delay={200}
      viewFactor={1}
      easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
    >
      <header>
        <h2 className="text-center text-[28px] lg:text-[54px]">Nasz blog</h2>
        <h3 className="text-center text-[15px] text-[var(--magenta-100)] uppercase lg:text-[16px]">
          O kosmetologii i medycynie estetycznej
        </h3>
      </header>
    </RevealWrapper>
  );
}
