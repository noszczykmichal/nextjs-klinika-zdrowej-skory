import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { getCategoryPageData } from "@/utils/sanityPageData";
import { notFound } from "next/navigation";
import { createCategoryMetadataGenerator } from "@/utils/metadata";

export const generateMetadata = createCategoryMetadataGenerator("training");

export default async function TrainingCategoryPage({
  params,
}: {
  params: Promise<{ trainingCategory: string }>;
}) {
  const { trainingCategory } = await params;
  const pageData = await getCategoryPageData("training", trainingCategory);

  if (!pageData) {
    return notFound();
  }

  const { categoryData, categoryResources, imageData } = pageData;
  const { title, description, altForMainImage, summary } = categoryData;

  const bannerData = {
    title,
    altForMainImage,
    imageData,
    summary,
  };

  const routesData = [
    {
      routeName: "Szkolenia",
      url: "/szkolenia",
    },
    { routeName: `${title}` },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid max-w-325 grid-cols-1 gap-5 md:grid-cols-[4fr__6fr] md:gap-10 lg:gap-15 xl:gap-22.5">
        <AsideNavigation
          className="order-2 sm:order-1"
          currentCategory={trainingCategory}
          resourceType="training"
        />
        <AnimatedArticle
          articleContent={description}
          categoryResources={categoryResources}
          resourceType="training"
        />
      </div>
    </LayoutWrapper>
  );
}
