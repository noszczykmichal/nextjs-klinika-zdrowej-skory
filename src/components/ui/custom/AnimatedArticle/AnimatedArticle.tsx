"use client";

import dynamic from "next/dynamic";

import { ListItemData } from "@/types/types";
import { PortableTextBlock } from "next-sanity";

const AnimatedArticleContent = dynamic(
  () =>
    import(
      "@/components/ui/custom/AnimatedArticle/AnimatedArticleContent/AnimatedArticleContent"
    ),
  { ssr: false },
);

interface AnimatedArticleProps {
  articleContent: PortableTextBlock[];
  featuredTreatments?: ListItemData[];
}

export default function AnimatedArticle({
  articleContent,
  featuredTreatments,
}: AnimatedArticleProps) {
  return (
    <AnimatedArticleContent
      articleContent={articleContent}
      featuredTreatments={featuredTreatments}
    />
  );
}
