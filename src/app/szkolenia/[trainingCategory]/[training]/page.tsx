import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { getAllTrainings } from "@/utils/sanityPageData";
import { getResourcePageData } from "@/utils/sanityPageData";
import { notFound } from "next/navigation";
import { createResourceMetadataGenerator } from "@/utils/metadata";

type TrainingPageParams = Promise<{
  trainingCategory: string;
  training: string;
}>;

export const generateMetadata = createResourceMetadataGenerator("training");

export default async function TrainingPage({
  params,
}: {
  params: TrainingPageParams;
}) {
  const { training } = await params;
  const pageData = await getResourcePageData("training", training);

  if (!pageData) {
    return notFound();
  }
  const { imageData, resourceData } = pageData;
  const {
    title: trainingName,
    category: trainingCategory,
    description,
    summary,
    altForMainImage,
  } = resourceData;

  const bannerData = {
    title: trainingName,
    altForMainImage,
    imageData,
    summary,
  };

  const availableTrainings = await getAllTrainings();

  const routesData = [
    {
      routeName: "Szkolenia",
      url: "/szkolenia",
    },
    {
      routeName: `${trainingCategory.title}`,
      url: `/szkolenia/${trainingCategory.categorySlug.current}`,
    },
    {
      routeName: `${trainingName}`,
    },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid max-w-325 grid-cols-1 gap-5 md:grid-cols-[4fr__6fr] md:gap-10 lg:gap-15 xl:gap-22.5">
        <AsideNavigation
          className="order-2 md:order-1"
          resourceType="training"
        />
        <AnimatedArticle
          articleContent={description}
          resourceType="training"
          isDetailPage={true}
          availableTrainings={availableTrainings}
        />
      </div>
    </LayoutWrapper>
  );
}
