import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import HeroArticle from "@/components/HomePage/HeroArticle/HeroArticle";
import FeaturedPostsArticle from "@/components/HomePage/FeaturedPostsArticle/FeaturedPostsArticle";
import { homePageArticleContent } from "@/utils/config";

export default function HomePage() {
  return (
    <LayoutWrapper>
      <MainBanner headerText="Poznaj Nas bliżej" />
      <HeroArticle
        headerText="Klinika Zdrowej Skóry – miejsce tworzone z pasją i sercem"
        articleContent={homePageArticleContent}
      />
      <FeaturedPostsArticle />
    </LayoutWrapper>
  );
}
