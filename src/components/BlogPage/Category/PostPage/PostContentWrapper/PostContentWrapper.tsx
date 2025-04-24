"use client";
import dynamic from "next/dynamic";

import { PostDetails } from "@/types/types";
import PostPageBanner from "@/components/BlogPage/Category/PostPage/PostPageBanner/PostPageBanner";

interface PostContentWrapperProps {
  postData: PostDetails;
}

const Post = dynamic(
  () => import("@/components/BlogPage/Category/PostPage/Post/Post"),
  { ssr: false }
);

export default function PostContentWrapper({
  postData,
}: PostContentWrapperProps) {
  return (
    <>
      <PostPageBanner postDetails={postData} />
      <Post postDetails={postData} />
    </>
  );
}
