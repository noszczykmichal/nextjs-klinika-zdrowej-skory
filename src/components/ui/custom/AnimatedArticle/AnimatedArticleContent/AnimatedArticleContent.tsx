import { useRef } from "react";
import { PortableText, PortableTextBlock } from "next-sanity";

import FeaturedTreatments from "./FeaturedTreatments/FeaturedTreatments";
import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";
import { ListItemData } from "@/types/types";
import useScrollReveal from "@/hooks/useScrollReveal";

interface AnimatedArticleContentProps {
  articleContent: PortableTextBlock[];
  featuredTreatments?: ListItemData[];
}

export default function AnimatedArticleContent({
  articleContent,
  featuredTreatments,
}: AnimatedArticleContentProps) {
  const revealItem = useRef<HTMLDivElement>(null);
  useScrollReveal(revealItem, 200, 0.1);

  return (
    <article className="md:order-2" ref={revealItem}>
      {
        <PortableText
          value={articleContent}
          components={portableTextComponentConfig}
        />
      }
      {featuredTreatments && (
        <FeaturedTreatments treatmentsData={featuredTreatments} />
      )}
    </article>
  );
}
