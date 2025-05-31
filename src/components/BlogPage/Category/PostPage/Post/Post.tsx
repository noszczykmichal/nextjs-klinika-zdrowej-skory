"use client";

import { useRef } from "react";
import { PortableText } from "next-sanity";

import { PostDetails } from "@/types/types";
import useScrollReveal from "@/hooks/useScrollReveal";
import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";

interface PostProps {
  postDetails: PostDetails;
}

export default function Post({ postDetails }: PostProps) {
  const { summary, postContent } = postDetails;
  const revealItem = useRef<HTMLElement>(null);
  useScrollReveal(revealItem, 200, 0.1);

  return (
    <article className="text-justify text-[15px]" ref={revealItem}>
      <p className="pb-[16px] font-semibold">{summary}</p>
      <PortableText
        value={postContent}
        components={portableTextComponentConfig}
      />
    </article>
  );
}
