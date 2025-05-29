"use client";

import dynamic from "next/dynamic";

import { HeroArticleData } from "@/types/types";

const HeroArticleContent = dynamic(
  () =>
    import(
      "@/components/HomePage/HeroArticle/HeroArticleContent/HeroArticleContent"
    ),
  { ssr: false }
);

interface HeroArticleProps {
  headerText: string;
  articleContent: HeroArticleData[];
}

export default function HeroArticle({
  headerText,
  articleContent,
}: HeroArticleProps) {
  return (
    <article>
      <HeroArticleContent
        headerText={headerText}
        articleData={articleContent}
      />
    </article>
  );
}
