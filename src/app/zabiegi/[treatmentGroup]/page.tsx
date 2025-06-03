import { client } from "@/sanity/client";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import { ListItemData, TreatmentGroup } from "@/types/types";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";

const TREATMENT_GROUP_QUERY = `*[_type== 'treatmentGroup' && groupSlug.current==$treatmentGroup][0]{_id, altForMainImage, description, groupSlug, mainImage, title, summary}`;
const FEATURED_TREATMENTS_QUERY = `*[_type=='treatment' && treatmentGroup->groupSlug.current==$treatmentGroup]{_id, altForMainImage, mainImage, title, summary, "slug": treatmentSlug, "category": treatmentGroup->{title, "categorySlug": groupSlug} }`;

const options = { next: { revalidate: 30 } };

export default async function TreatmentGroupPage({
  params,
}: {
  params: Promise<{ treatmentGroup: string }>;
}) {
  const treatmentGroupData = await client.fetch<TreatmentGroup>(
    TREATMENT_GROUP_QUERY,
    await params,
    options,
  );
  const featuredTreatments = await client.fetch<ListItemData[]>(
    FEATURED_TREATMENTS_QUERY,
    await params,
    options,
  );

  const { treatmentGroup } = await params;
  const { title, description, altForMainImage, mainImage, summary } =
    treatmentGroupData;

  const bannerData = {
    title,
    description,
    altForMainImage,
    mainImage,
    summary,
  };

  const routesData = [
    {
      routeName: "Zabiegi",
      url: "/zabiegi",
    },
    { routeName: `${title}` },
  ];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <BannerWithSummary bannerData={bannerData} />
      <div className="grid max-w-[1300px] grid-cols-1 gap-[20px] md:grid-cols-[4fr__6fr] md:gap-[40px] lg:gap-[60px] xl:gap-[90px]">
        <AsideNavigation
          className="order-2 sm:order-1"
          currentGroup={treatmentGroup}
        />
        <AnimatedArticle
          articleContent={description}
          featuredTreatments={featuredTreatments}
        />
      </div>
    </LayoutWrapper>
  );
}
