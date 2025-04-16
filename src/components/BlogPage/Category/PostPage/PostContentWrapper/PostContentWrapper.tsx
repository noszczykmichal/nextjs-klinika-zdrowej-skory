"use client";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import dynamic from "next/dynamic";

import { PostDetails } from "@/types/types";
import PostPageBanner from "@/components/BlogPage/Category/PostPage/PostPageBanner/PostPageBanner";

interface PostContentWrapperProps {
  postData: PostDetails;
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const Post = dynamic(
  () => import("@/components/BlogPage/Category/PostPage/Post/Post"),
  { ssr: false }
);

export default function PostContentWrapper({
  postData,
}: PostContentWrapperProps) {
  const { mainImage, title: postTitle } = postData;
  const postImageUrl = mainImage ? urlFor(mainImage)!.fit("max").url() : null;

  return (
    <>
      <PostPageBanner headerText={postTitle} imageUrl={postImageUrl} />
      <Post postDetails={postData} />
    </>
  );
}
