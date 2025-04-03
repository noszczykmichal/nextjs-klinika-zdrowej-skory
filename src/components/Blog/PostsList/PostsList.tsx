"use client";
import { client } from "@/sanity/client";
import { useState, useEffect } from "react";

import { PostDetails } from "@/types/types";
import PostCard from "./PostCard/PostCard";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface PostsListProps {
  postsDetails: PostDetails[];
}
const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

function PostsList({ postsDetails }: PostsListProps) {
  const [imageWidth, setImageWidth] = useState(100);
  console.log("imagewidth", imageWidth);
  useEffect(() => {
    const updateImageWidth = () => {
      const width = window.innerWidth;

      if (width <= 640) {
        setImageWidth(width);
      } else if (width >= 640 && width <= 1024) {
        setImageWidth(Math.floor(width * 0.5));
      } else {
        setImageWidth(Math.floor(width * 0.33));
      }
    };

    updateImageWidth(); // Set initial width
    window.addEventListener("resize", updateImageWidth);
    return () => window.removeEventListener("resize", updateImageWidth);
  }, []);

  const imgSrc = (postData: PostDetails) => {
    const imageUrl = urlFor(postData.mainImage)?.fit("max").url();

    if (imageUrl === undefined) {
      return "";
    }

    return imageUrl;
  };

  return (
    <ul className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-between gap-[50px] md:gap-[20px]">
      {postsDetails.map((post) => (
        <PostCard key={post._id} postData={post} imgSrc={imgSrc(post)} />
      ))}
    </ul>
  );
}

export default PostsList;
