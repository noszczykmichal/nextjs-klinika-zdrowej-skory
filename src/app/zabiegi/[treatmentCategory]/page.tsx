import { client } from "@/sanity/client";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import { ListItemData, TreatmentCategory } from "@/types/types";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { urlFor } from "@/utils/clientSideUtils";
import { getImage } from "@/utils/serverSideUtils";

const TREATMENT_CATEGORY_QUERY = `*[_type== 'treatmentCategory' && categorySlug.current==$treatmentCategory][0]{_id, altForMainImage, description, categorySlug, mainImage, title, summary}`;
const FEATURED_TREATMENTS_QUERY = `*[_type=='treatment' && treatmentCategory->categorySlug.current==$treatmentCategory]{_id, altForMainImage, mainImage, title, summary, "slug": treatmentSlug, "category": treatmentCategory->{title, categorySlug} }`;

const options = { next: { revalidate: 30 } };

export default async function TreatmentCategoryPage({
  params,
}: {
  params: Promise<{ treatmentCategory: string }>;
}) {
  const treatmentCategoryData = await client.fetch<TreatmentCategory>(
    TREATMENT_CATEGORY_QUERY,
    await params,
    options,
  );
  const featuredTreatments = await client.fetch<ListItemData[]>(
    FEATURED_TREATMENTS_QUERY,
    await params,
    options,
  );

  const { treatmentCategory } = await params;
  const { title, description, altForMainImage, mainImage, summary } =
    treatmentCategoryData;

  const mainImageUrl = urlFor(mainImage)!.fit("max").url();
  const imageData = await getImage(mainImageUrl);

  const bannerData = {
    title,
    altForMainImage,
    imageData,
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
          currentCategory={treatmentCategory}
        />
        <AnimatedArticle
          articleContent={description}
          featuredTreatments={featuredTreatments}
        />
      </div>
    </LayoutWrapper>
  );
}
