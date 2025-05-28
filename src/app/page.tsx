import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import HeroArticle from "@/components/HomePage/HeroArticle/HeroArticle";
import FeaturedPostsArticle from "@/components/HomePage/FeaturedPostsArticle/FeaturedPostsArticle";

export default function HomePage() {
  return (
    <LayoutWrapper>
      <MainBanner headerText="Poznaj Nas bliżej" />
      <HeroArticle />
      <FeaturedPostsArticle />
    </LayoutWrapper>
  );
}
