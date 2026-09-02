import { client } from "@/sanity/client";

import { ResourceDetails } from "@/types/types";
import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import BannerWithSummary from "@/components/ui/custom/BannerWithSummary/BannerWithSummary";
import AsideNavigation from "@/components/ui/custom/AsideNavigation/AsideNavigation";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { urlFor } from "@/utils/clientSideUtils";
import { getImage } from "@/utils/serverSideUtils";
import { getAllTrainings } from "@/utils/sanityPageData";

// to-do: refactor and move query to the dedicated handler
const TRAINING_QUERY = `*[_type == "training" && trainingSlug.current == $training][0]{
  mainImage,
  title,
  summary,
  altForMainImage,
  "category": trainingCategory->{title, categorySlug},
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

export default async function TrainingPage({
  params,
}: {
  params: Promise<{ trainingCategory: string; training: string }>;
}) {
  const training = await client.fetch<ResourceDetails>(
    TRAINING_QUERY,
    await params,
    options,
  );

  const {
    title: trainingName,
    category: trainingCategory,
    description,
    mainImage,
    summary,
    altForMainImage,
  } = training;

  const mainImageUrl = urlFor(mainImage)!.fit("max").url();
  const imageData = await getImage(mainImageUrl);

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
      <div className="grid max-w-[1300px] grid-cols-1 gap-[20px] md:grid-cols-[4fr__6fr] md:gap-[40px] lg:gap-[60px] xl:gap-[90px]">
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
