import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { getResourcePageData } from "@/utils/sanityPageData";
import { notFound } from "next/navigation";
import { createResourceMetadataGenerator } from "@/utils/metadata";

type TreatmentPageParams = Promise<{
  treatmentCategory: string;
  treatment: string;
}>;

export const generateMetadata = createResourceMetadataGenerator("treatment");

export default async function TreatmentPage({
  params,
}: {
  params: TreatmentPageParams;
}) {
  const { treatment } = await params;
  const pageData = await getResourcePageData("treatment", treatment);

  if (!pageData) {
    return notFound();
  }

  const { imageData, resourceData } = pageData;
  const {
    title: treatmentName,
    category: treatmentCategory,
    description,
    summary,
    altForMainImage,
  } = resourceData;

  const bannerData = {
    title: treatmentName,
    altForMainImage,
    imageData,
    summary,
  };

  const routesData = [
    {
      routeName: "Zabiegi",
      url: "/zabiegi",
    },
    {
      routeName: `${treatmentCategory.title}`,
      url: `/zabiegi/${treatmentCategory.categorySlug.current}`,
    },
    {
      routeName: `${treatmentName}`,
    },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid max-w-325 grid-cols-1 gap-5 md:grid-cols-[4fr__6fr] md:gap-10 lg:gap-15 xl:gap-22.5">
        <AsideNavigation
          className="order-2 md:order-1"
          resourceType="treatment"
        />
        <AnimatedArticle
          articleContent={description}
          resourceType="treatment"
        />
      </div>
    </LayoutWrapper>
  );
}
