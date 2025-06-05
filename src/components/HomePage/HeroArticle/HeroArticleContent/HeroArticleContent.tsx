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
    <div className="flex flex-col gap-x-[50px] lg:flex-row" ref={revealItem}>
      <h2
        style={{
          fontSize: "var(--font-size-heading)",
        }}
        className="text-center font-extralight lg:w-[50%] lg:text-left"
      >
        {headerText}
      </h2>
      <div className="pt-[26px] text-justify text-[17px] lg:w-[50%] lg:pt-0">
        {content}
      </div>
    </div>
  );
}
