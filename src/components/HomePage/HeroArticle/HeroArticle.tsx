"use client";

import dynamic from "next/dynamic";

const AnimatedContent = dynamic(
  () =>
    import("@/components/HomePage/HeroArticle/AnimatedContent/AnimatedContent"),
  { ssr: false }
);

export default function HeroArticle() {
  return (
    <article>
      <AnimatedContent />
    </article>
  );
}
