import { BreadcrumbWrapper } from "@/components/ui/custom/BreadcrumbWrapper/BreadcrumbWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import HeroArticle from "@/components/HomePage/HeroArticle/HeroArticle";
import FeaturedPostsSection from "@/components/HomePage/FeaturedPostsSection/FeaturedPostsSection";

export default function HomePage() {
  return (
    <>
      <BreadcrumbWrapper />
      <main className="w-full flex flex-col items-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[50px] pb-[50px] max-w-[1300px]">
          <MainBanner headerText="Poznaj Nas bliżej" />
          <HeroArticle />
        </section>
        <FeaturedPostsSection />
      </main>
    </>
  );
}
