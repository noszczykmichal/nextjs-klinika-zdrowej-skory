"use client";

import { PortableText, PortableTextBlock } from "next-sanity";
import { RevealWrapper } from "next-reveal";

import FeaturedTreatments from "@/components/ui/custom/AnimatedArticle/FeaturedTreatments/FeaturedTreatments";
import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";
import { ListItemData } from "@/types/types";

interface AnimatedArticleProps {
  articleContent: PortableTextBlock[];
  featuredTreatments?: ListItemData[];
}

export default function AnimatedArticle({
  articleContent,
  featuredTreatments,
}: AnimatedArticleProps) {
  return (
    <RevealWrapper
      origin="bottom"
      distance="20px"
      duration={500}
      delay={200}
      viewFactor={0.1}
      easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
      className="md:order-2"
    >
      <article>
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
    </RevealWrapper>
  );
}
