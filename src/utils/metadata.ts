import { Metadata } from "next";

import {
  ResourceType,
  ResourceCategoryType,
  TopLevelRoute,
} from "@/types/types";
import {
  getResourcePageData,
  getCategoryResources,
  getSinglePostData,
} from "@/utils/sanityPageData";

/**
 * Builds a Next.js Metadata object (title, description, OG and Twitter tags)
 * for a single resource page (treatment/training detail page).
 *
 * @param title - Page title, used for <title>, og:title, twitter:title
 * @param description - Meta description, used for og:description, twitter:description
 * @param imageUrl - Absolute image URL for social preview cards
 * @param imageWidth - Image width in pixels (required by og:image:width)
 * @param imageHeight - Image height in pixels (required by og:image:height)
 * @returns A partial Metadata object to return from generateMetadata
 */
function buildSEOMetaData({
  resourceType,
  categorySlug,
  resourceSlug = null,
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight,
}: {
  resourceType: ResourceType;
  categorySlug: string;
  resourceSlug?: string | null;
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}): Pick<
  Metadata,
  "alternates" | "title" | "description" | "openGraph" | "twitter"
> {
  const resourceTypeMap: Record<ResourceType, TopLevelRoute> = {
    treatment: "zabiegi",
    training: "szkolenia",
    post: "blog",
  };

  const mainRoute = resourceTypeMap[resourceType];
  const categoryRoute = `/${mainRoute}/${categorySlug}`;
  const resourceRoute = resourceSlug ? `/${resourceSlug}` : "";
  const canonicalUrl = categoryRoute + resourceRoute;

  return {
    alternates: { canonical: canonicalUrl },
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

function createResourceMetadataGenerator(resourceType: ResourceType) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ [key: string]: string }>;
  }): Promise<Metadata> {
    const resolvedParams = await params;
    const slug = resolvedParams[resourceType];
    const categoryType: ResourceCategoryType = `${resourceType}Category`;
    const categorySlug = resolvedParams[categoryType];
    const pageData = await getResourcePageData(resourceType, slug);

    if (!pageData || !pageData.imageData) {
      return {};
    }

    const { imageData, resourceData } = pageData;
    const { title, metaDescription } = resourceData;
    const { src, height, width } = imageData.img;

    return buildSEOMetaData({
      categorySlug,
      resourceType,
      title,
      description: metaDescription,
      imageUrl: src,
      imageWidth: width,
      imageHeight: height,
      resourceSlug: slug,
    });
  };
}

function createCategoryMetadataGenerator(resourceType: ResourceType) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ [key: string]: string }>;
  }): Promise<Metadata> {
    const resolvedParams = await params;
    const categorySlug =
      resourceType === "training"
        ? resolvedParams["trainingCategory"]
        : resolvedParams["treatmentCategory"];
    const pageData = await getCategoryResources(resourceType, categorySlug);

    if (!pageData || !pageData.imageData) {
      return {};
    }

    const { imageData, categoryData } = pageData;
    const { title, summary } = categoryData;
    const { src, height, width } = imageData.img;

    return buildSEOMetaData({
      resourceType,
      categorySlug,
      title,
      description: summary,
      imageUrl: src,
      imageWidth: width,
      imageHeight: height,
    });
  };
}

function createPostMetaData() {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ [key: string]: string }>;
  }): Promise<Metadata> {
    const resolvedParams = await params;
    const postCategorySlug = resolvedParams["postCategory"];
    const postSlug = resolvedParams["post"];

    const fetchedData = await getSinglePostData({ post: postSlug });

    if (!fetchedData || !fetchedData.imageData) {
      return {};
    }

    const { imageData, postData } = fetchedData;
    const { title, summary } = postData;
    const { src, height, width } = imageData.img;

    return buildSEOMetaData({
      categorySlug: postCategorySlug,
      resourceType: "post",
      resourceSlug: postSlug,
      title,
      description: summary,
      imageUrl: src,
      imageWidth: width,
      imageHeight: height,
    });
  };
}

export {
  buildSEOMetaData,
  createResourceMetadataGenerator,
  createCategoryMetadataGenerator,
  createPostMetaData,
};
