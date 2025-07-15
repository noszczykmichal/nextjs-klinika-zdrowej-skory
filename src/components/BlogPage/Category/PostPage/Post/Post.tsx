"use client";

import { PortableText } from "next-sanity";
import { RevealWrapper } from "next-reveal";

import { PostDetails } from "@/types/types";
import PostPageBanner from "@/components/BlogPage/Category/PostPage/PostPageBanner/PostPageBanner";
import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";

interface PostProps {
  postData: PostDetails;
}

export default function Post({ postData }: PostProps) {
  const { summary, postContent } = postData;

  return (
    <>
      <PostPageBanner postDetails={postData} />
      <RevealWrapper
        origin="bottom"
        distance="20px"
        duration={500}
        delay={200}
        viewFactor={0.1}
        easing="cubic-bezier(0.645, 0.045, 0.355, 1)"
      >
        <article className="text-justify text-[15px]">
          <p className="pb-[16px] font-semibold">{summary}</p>
          <PortableText
            value={postContent}
            components={portableTextComponentConfig}
          />
        </article>
      </RevealWrapper>
    </>
  );
}
