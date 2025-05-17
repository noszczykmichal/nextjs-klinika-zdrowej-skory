import { client } from "@/sanity/client";

import { BreadcrumbWrapper } from "@/components/ui/custom/BreadcrumbWrapper/BreadcrumbWrapper";
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
    options
  );
  const featuredTreatments = await client.fetch<ListItemData[]>(
    FEATURED_TREATMENTS_QUERY,
    await params,
    options
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
    <>
      <BreadcrumbWrapper routesData={routesData} />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <BannerWithSummary bannerData={bannerData} />
          <div className="grid grid-cols-1 md:grid-cols-[4fr__6fr] gap-[20px] md:gap-[40px] lg:gap-[60px] xl:gap-[90px] max-w-[1300px]">
            <AsideNavigation
              className="order-2 sm:order-1"
              currentGroup={treatmentGroup}
            />
            <AnimatedArticle
              articleContent={description}
              featuredTreatments={featuredTreatments}
            />
          </div>
        </section>
      </main>
    </>
  );
}
