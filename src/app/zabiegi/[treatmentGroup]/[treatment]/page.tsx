import { client } from "@/sanity/client";

import { TreatmentDetails } from "@/types/types";
import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";

const TREATMENT_QUERY = `*[_type == "treatment" && treatmentSlug.current == $treatment][0]{
  mainImage,
  title,
  summary,
  altForMainImage,
  treatmentGroup->{title, groupSlug},
  description[]{
    ...,
    _type == "image" => {
      ...,
      alt,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ treatmentGroup: string; treatment: string }>;
}) {
  const treatment = await client.fetch<TreatmentDetails>(
    TREATMENT_QUERY,
    await params,
    options
  );

  const {
    title: treatmentName,
    treatmentGroup,
    description,
    mainImage,
    summary,
    altForMainImage,
  } = treatment;

  const routesData = [
    {
      routeName: "Zabiegi",
      url: "/zabiegi",
    },
    {
      routeName: `${treatmentGroup.title}`,
      url: `/zabiegi/${treatmentGroup.groupSlug.current}`,
    },
    {
      routeName: `${treatmentName}`,
    },
  ];

  const bannerData = {
    mainImage,
    title: treatmentName,
    summary,
    altForMainImage,
    description,
  };

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid grid-cols-1 md:grid-cols-[4fr__6fr] gap-[20px] md:gap-[40px] lg:gap-[60px] xl:gap-[90px] max-w-[1300px]">
        <AsideNavigation className="order-2 md:order-1" />
        <AnimatedArticle articleContent={description} />
      </div>
    </LayoutWrapper>
  );
}
