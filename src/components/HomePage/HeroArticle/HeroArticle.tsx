"use client";

import dynamic from "next/dynamic";

const HeroArticleContent = dynamic(
  () =>
    import(
      "@/components/HomePage/HeroArticle/HeroArticleContent/HeroArticleContent"
    ),
  { ssr: false }
);

export default function HeroArticle() {
  return (
    <article>
      <HeroArticleContent />
    </article>
  );
}
