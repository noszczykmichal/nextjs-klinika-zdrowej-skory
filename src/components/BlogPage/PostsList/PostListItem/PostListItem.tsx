"use client";
import { useRef, useEffect } from "react";
import ScrollReveal from "scrollreveal";

import { PostDetails } from "@/types/types";
import ImageCard from "@/components/BlogPage/PostsList/PostListItem/ImageCard/ImageCard";
import PostSummary from "@/components/BlogPage/PostsList/PostListItem/PostSummary/PostSummary";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { scrollRevealConfig } from "@/utils/config";

interface PostListItemProps {
  postData: PostDetails;
}

export default function PostListItem({ postData }: PostListItemProps) {
  const revealItem = useRef<HTMLLIElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const animatedElement = revealItem.current;
    if (!prefersReducedMotion && animatedElement) {
      ScrollReveal().reveal(animatedElement, scrollRevealConfig());
    }

    return () => {
      if (animatedElement) {
        ScrollReveal().clean(animatedElement);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <li
      className="grid gap-[50px] lg:gap-[100px] md:grid-cols-[1fr_2fr] place-items-start border-b-1 border-[var(--gray-75)] py-[50px]"
      ref={revealItem}
    >
      <ImageCard postData={postData} />
      <PostSummary postData={postData} />
    </li>
  );
}
