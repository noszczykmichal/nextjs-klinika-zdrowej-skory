import { Metadata } from "next";

import { ResourceType } from "@/types/types";
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
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight,
}: {
  title: string;
  description: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}): Pick<Metadata, "title" | "description" | "openGraph" | "twitter"> {
  return {
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
    const pageData = await getResourcePageData(resourceType, slug);

    if (!pageData || !pageData.imageData) {
      return {};
    }

    const { imageData, resourceData } = pageData;
    const { title, summary } = resourceData;
    const { src, height, width } = imageData.img;

    return buildSEOMetaData({
      title,
      description: summary,
      imageUrl: src,
      imageWidth: width,
      imageHeight: height,
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
    const postSlug = resolvedParams["post"];

    const fetchedData = await getSinglePostData({ post: postSlug });

    if (!fetchedData || !fetchedData.imageData) {
      return {};
    }

    const { imageData, postData } = fetchedData;
    const { title, summary } = postData;
    const { src, height, width } = imageData.img;

    return buildSEOMetaData({
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
