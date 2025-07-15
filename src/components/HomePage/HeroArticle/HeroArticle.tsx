"use client";

import { RevealWrapper } from "next-reveal";

import { HeroArticleData } from "@/types/types";

interface HeroArticleProps {
  headerText: string;
  articleContent: HeroArticleData[];
}

export default function HeroArticle({
  headerText,
  articleContent,
}: HeroArticleProps) {
  const content = articleContent.map((el, index) => (
    <p
      className={`${index < articleContent.length - 1 ? "pb-[26px]" : ""} `}
      key={el.id}
    >
      {el.paragraphContent}
    </p>
  ));

  return (
    <article>
      <RevealWrapper
        origin="bottom"
        distance="20px"
        duration={500}
        delay={200}
        viewFactor={0.1}
        easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
      >
        <div className="flex flex-col gap-x-[50px] lg:flex-row">
          <h2
            style={{
              fontSize: "var(--font-size-heading)",
            }}
            className="text-center font-extralight whitespace-break-spaces lg:w-[50%] lg:text-left"
          >
            {headerText}
          </h2>
          <div className="pt-[26px] text-justify text-[17px] lg:w-[50%] lg:pt-0">
            {content}
          </div>
        </div>
      </RevealWrapper>
    </article>
  );
}
