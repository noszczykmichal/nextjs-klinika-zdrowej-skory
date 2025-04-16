"use client";

import { useRef, useEffect } from "react";

import { PostDetails } from "@/types/types";
import Paragraph from "@/components/BlogPage/Category/PostPage/Post/Paragraph/Paragraph";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import ScrollReveal from "scrollreveal";
import { scrollRevealConfig } from "@/utils/config";

interface PostProps {
  postDetails: PostDetails;
}

export default function Post({ postDetails }: PostProps) {
  const { summary, contentSections } = postDetails;
  const revealItem = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const animatedElement = revealItem.current;
    if (!prefersReducedMotion && animatedElement) {
      ScrollReveal().reveal(animatedElement, scrollRevealConfig(200, 0.1));
    }

    return () => {
      if (animatedElement) {
        ScrollReveal().clean(animatedElement);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <article className="text-justify text-[15px]" ref={revealItem}>
      <p className="font-semibold pb-[16px]">{summary}</p>
      {contentSections.map((elementData) => (
        <Paragraph paragraphData={elementData} key={elementData._key} />
      ))}
    </article>
  );
}
