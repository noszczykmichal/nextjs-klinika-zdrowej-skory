"use client";
import dynamic from "next/dynamic";

const FeaturedPostsHeaderContent = dynamic(
  () =>
    import(
      "@/components/HomePage/FeaturedPostsArticle/FeaturedPostsHeader/FeaturedPostsHeaderContent/FeaturedPostsHeaderContent"
    ),
  { ssr: false },
);

export default function FeaturedPostsHeader() {
  return <FeaturedPostsHeaderContent />;
}
