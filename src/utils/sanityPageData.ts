import { client } from "@/sanity/client";
import { cache } from "react";

import {
  ListItemData,
  ResourceCategory,
  ResourceType,
  NavigationDataInterface,
  BasicEntityReference,
  ResourceDetails,
  PostDetails,
} from "@/types/types";
import { urlFor } from "@/utils/clientSideUtils";
import { getImage } from "@/utils/serverSideUtils";

const options = { next: { revalidate: 30 } };

async function getCategoryPageData(
  resourceType: ResourceType,
  categorySlug: string,
) {
  const CATEGORY_RESOURCES_QUERY = `*[_type=='${resourceType}' && ${resourceType}Category->categorySlug.current==$categorySlug]{_id, altForMainImage, mainImage, title, summary, "slug": ${resourceType}Slug, "category": ${resourceType}Category->{title, categorySlug} }`;

  const fetchedResources = await getCategoryResources(
    resourceType,
    categorySlug,
  );

  if (!fetchedResources) {
    return null;
  }

  const { categoryData, imageData } = fetchedResources;

  const categoryResources = await client.fetch<ListItemData[]>(
    CATEGORY_RESOURCES_QUERY,
    { categorySlug },
    options,
  );

  return { categoryData, categoryResources, imageData };
}

const getCategoryResources = cache(
  async (resourceType: ResourceType, categorySlug: string) => {
    const categoryType = `${resourceType}Category`;
    const CATEGORY_QUERY = `*[_type== '${categoryType}' && categorySlug.current==$categorySlug][0]{_id, altForMainImage, description, categorySlug, mainImage, title, summary}`;

    const categoryData = await client.fetch<ResourceCategory>(
      CATEGORY_QUERY,
      { categorySlug },
      options,
    );

    if (!categoryData) {
      return null;
    }

    const mainImageUrl = urlFor(categoryData.mainImage)!.fit("max").url();
    const imageData = await getImage(mainImageUrl);

    return { categoryData, imageData };
  },
);

/** function for fetching data required by individual resource page either treatment or training specific */
const getResourcePageData = cache(
  async (resourceType: ResourceType, resourceSlug: string) => {
    const RESOURCE_QUERY = `*[_type == "${resourceType}" && ${resourceType}Slug.current == $resourceSlug][0]{
  mainImage,
  title,
  summary,
  altForMainImage,
   "category": ${resourceType}Category->{title, categorySlug},
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

    const resourceData = await client.fetch<ResourceDetails>(
      RESOURCE_QUERY,
      { resourceSlug },
      options,
    );

    if (!resourceData) {
      return null;
    }

    const mainImageUrl = urlFor(resourceData.mainImage)!.fit("max").url();
    const imageData = await getImage(mainImageUrl);

    return {
      resourceData,
      imageData,
    };
  },
);

const RESOURCE_TYPES: ResourceType[] = ["treatment", "training"];
/** fetches the data used for building main navigation */
async function getNavData(): Promise<NavigationDataInterface> {
  const entries = await Promise.all(
    RESOURCE_TYPES.map(async (resource) => {
      const NAV_CATEGORY_QUERY = `*[_type=='${resource}Category'] | order(order asc) {_id, title, "slug":categorySlug}`;

      const queryResult = await client.fetch<Partial<ListItemData>[]>(
        NAV_CATEGORY_QUERY,
        {},
        options,
      );

      return [resource, queryResult] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<
    ResourceType,
    Partial<ListItemData>[]
  >;
}

/** fetches data used for building aside navigation*/
async function getCategoriesNavData(resourceType: ResourceType) {
  const CATEGORIES_QUERY = `*[_type == "${resourceType}Category"]{categorySlug, title, _id}`;

  const resourceCategories = await client.fetch<ResourceCategory[]>(
    CATEGORIES_QUERY,
    {},
    options,
  );

  return resourceCategories;
}

async function getAllResources(resourceType: ResourceType) {
  const ALL_RESOURCES_QUERY = `*[_type == "${resourceType}"]{_id, altForMainImage, "category": ${resourceType}Category->{title, categorySlug}, mainImage, "slug": ${resourceType}Slug, summary, title}`;

  const allResources = await client.fetch<ListItemData[]>(
    ALL_RESOURCES_QUERY,
    {},
    options,
  );

  return allResources;
}

async function getAllTrainings() {
  const ALL_TRAININGS_QUERY = `*[_type=="training" ]{_id, title}`;

  try {
    const allTrainingsNames = await client.fetch<BasicEntityReference[]>(
      ALL_TRAININGS_QUERY,
      {},
      options,
    );

    if (!allTrainingsNames) {
      return [];
    }

    return allTrainingsNames;
  } catch (error) {
    console.warn(`Error fetching items. Error: ${error}`);
  }
}

async function getPostsByCategory({
  postCategorySlug,
}: {
  postCategorySlug: string;
}): Promise<PostDetails[]> {
  const POSTS_BY_CATEGORY_QUERY = `*[
  _type == "post"
  && category->categorySlug.current==$postCategorySlug]|order(publishedAt desc)[0...12]{_id, altForMainImage, title, slug, mainImage, summary, category->{title, categorySlug}}`;

  const posts = await client.fetch<PostDetails[]>(
    POSTS_BY_CATEGORY_QUERY,
    { postCategorySlug },
    options,
  );

  return posts;
}

const getSinglePostData = cache(async ({ post }: { post: string }) => {
  const POST_QUERY = `*[_type == "post" && slug.current == $post]{
  altForMainImage,
  publishedAt,
  mainImage,
  title,
  summary,
  postContent[]{
    ...,
    _type == "blockContentImage" => {
      ...,
      asset->{ _id, url, metadata { dimensions, lqip } }
    },
    _type == "gallery" => {
      ...,
      images[]{
        ...,
        asset->{ _id, url, metadata { dimensions, lqip } }
      }
    }
  },
  category->{title, categorySlug},
  treatment->{treatmentSlug, treatmentCategory->{categorySlug}},
  treatmentCategory->{categorySlug}
}[0]`;

  const postData = await client.fetch<PostDetails>(
    POST_QUERY,
    { post },
    options,
  );

  if (!postData) {
    return null;
  }

  const mainImageUrl = urlFor(postData.mainImage)!.fit("max").url();
  const imageData = await getImage(mainImageUrl);

  return { postData, imageData };
});

export {
  getCategoryPageData,
  getResourcePageData,
  getNavData,
  getCategoriesNavData,
  getAllResources,
  getAllTrainings,
  getCategoryResources,
  getPostsByCategory,
  getSinglePostData,
};
