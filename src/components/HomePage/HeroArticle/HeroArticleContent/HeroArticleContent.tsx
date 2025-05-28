"use client";

import { useRef } from "react";

import { HeroArticleData } from "@/types/types";
import useScrollReveal from "@/hooks/useScrollReveal";

interface HeroArticleContentProps {
  headerText: string;
  articleData: HeroArticleData[];
}

export default function HeroArticleContent({
  headerText,
  articleData,
}: HeroArticleContentProps) {
  const revealItem = useRef<HTMLDivElement>(null);
  useScrollReveal(revealItem, 200, 0.1);

  const content = articleData.map((el, index) => (
    <p
      className={`${index < articleData.length - 1 ? "pb-[26px]" : ""} `}
      key={el.id}
    >
      {el.paragraphContent}
    </p>
  ));

  return (
    <div className="flex flex-col lg:flex-row gap-x-[50px]" ref={revealItem}>
      <h2
        style={{
          fontSize: "var(--font-size-heading)",
        }}
        className="lg:w-[50%] font-extralight text-center lg:text-left"
      >
        {headerText}
      </h2>
      <div className="lg:w-[50%] text-[17px] text-justify pt-[26px] lg:pt-0">
        {content}
      </div>
    </div>
  );
}
