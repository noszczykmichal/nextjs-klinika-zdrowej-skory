import { CarouselContent } from "@/components/ui/carousel";

import { PostDetails } from "@/types/types";
import FeaturedPostCard from "./FeaturedPostCard/FeaturedPostCard";

interface FeaturedPostsListProps {
  posts: Partial<PostDetails>[];
}

export default function FeaturedPostsList({ posts }: FeaturedPostsListProps) {
  return (
    <CarouselContent className="-ml-1">
      {posts.map((post) => (
        <FeaturedPostCard featuredPost={post} key={post._id} />
      ))}
    </CarouselContent>
  );
}
