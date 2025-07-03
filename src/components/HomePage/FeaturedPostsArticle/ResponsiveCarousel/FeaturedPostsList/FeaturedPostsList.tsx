import { CarouselContent } from "@/components/ui/carousel";

import { ListItemData } from "@/types/types";
import FeaturedPostCard from "@/components/HomePage/FeaturedPostsArticle/ResponsiveCarousel/FeaturedPostsList/FeaturedPostCard/FeaturedPostCard";

interface FeaturedPostsListProps {
  posts: ListItemData[];
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
