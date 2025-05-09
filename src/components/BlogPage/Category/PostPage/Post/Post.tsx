"use client";

import { useRef } from "react";

import { PostDetails } from "@/types/types";
import Paragraph from "@/components/BlogPage/Category/PostPage/Post/Paragraph/Paragraph";
import useScrollReveal from "@/hooks/useScrollReveal";

interface PostProps {
  postDetails: PostDetails;
}

export default function Post({ postDetails }: PostProps) {
  const { summary, contentSections } = postDetails;
  const revealItem = useRef<HTMLElement>(null);
  useScrollReveal(revealItem, 200, 0.1);

  return (
    <article className="text-justify text-[15px]" ref={revealItem}>
      <p className="font-semibold pb-[16px]">{summary}</p>
      {contentSections.map((elementData) => (
        <Paragraph paragraphData={elementData} key={elementData._key} />
      ))}
    </article>
  );
}
