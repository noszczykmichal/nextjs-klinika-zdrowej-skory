"use client";
import { useRef } from "react";

import { PostDetails } from "@/types/types";
import ImageCard from "@/components/BlogPage/PostsList/PostListItem/ImageCard/ImageCard";
import PostSummary from "@/components/BlogPage/PostsList/PostListItem/PostSummary/PostSummary";
import useScrollReveal from "@/hooks/useScrollReveal";

interface PostListItemProps {
  postData: PostDetails;
}

export default function PostListItem({ postData }: PostListItemProps) {
  const revealItem = useRef<HTMLLIElement | null>(null);
  useScrollReveal(revealItem);

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
