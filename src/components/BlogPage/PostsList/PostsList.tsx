"use client";

import dynamic from "next/dynamic";

import { PostDetails } from "@/types/types";

const PostListItem = dynamic(
  () => import("@/components/BlogPage/PostsList/PostListItem/PostListItem"),
  { ssr: false }
);

interface PostsListProps {
  postsDetails: PostDetails[];
}

function PostsList({ postsDetails }: PostsListProps) {
  return (
    <ul className="w-full max-w-[500px] md:max-w-none mx-auto ">
      {postsDetails.map((post) => (
        <PostListItem key={post._id} postData={post} />
      ))}
    </ul>
  );
}

export default PostsList;
