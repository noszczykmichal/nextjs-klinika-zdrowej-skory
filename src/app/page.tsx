import { BreadcrumbHome } from "@/components/HomePage/BreadcrumbHome/BreadcrumbHome";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import HeroArticle from "@/components/HomePage/HeroArticle/HeroArticle";
import FeaturedPostsSection from "@/components/HomePage/FeaturedPostsSection/FeaturedPostsSection";

export default function HomePage() {
  return (
    <>
      <BreadcrumbHome className="breadcrumb-wrapper flex justify-start w-full max-w-[1300px] py-[20px] mx-auto" />
      <main className="w-full flex flex-col justify-center items-center px-[25px] md:px-[42px] mx-auto">
        <section className="flex flex-col gap-y-[50px] pb-[50px] max-w-[1300px]">
          <MainBanner headerText="Poznaj Nas bliżej" />
          <HeroArticle />
        </section>

        <FeaturedPostsSection />
      </main>
    </>
  );
}
