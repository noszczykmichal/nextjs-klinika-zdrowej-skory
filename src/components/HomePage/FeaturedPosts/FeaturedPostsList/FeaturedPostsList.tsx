import { PostDetails } from "@/types/types";
import FeaturedPostCard from "./FeaturedPostCard/FeaturedPostCard";

interface FeaturedPostsListProps {
  posts: Partial<PostDetails>[];
}

export default function FeaturedPostsList({ posts }: FeaturedPostsListProps) {
  return (
    <ul className="w-full flex justify-between">
      {posts.map((post) => (
        <FeaturedPostCard key={post._id} featuredPost={post} />
      ))}
    </ul>
  );
}
