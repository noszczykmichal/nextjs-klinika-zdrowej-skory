import { client } from "@/sanity/client";

import {
  ListItemData,
  ResourceCategory,
  ResourceType,
  NavigationDataInterface,
  BasicEntityReference,
} from "@/types/types";
import { urlFor } from "@/utils/clientSideUtils";
import { getImage } from "@/utils/serverSideUtils";

const options = { next: { revalidate: 30 } };

async function getCategoryPageData(
  resourceType: ResourceType,
  categorySlug: string,
) {
  const categoryType = `${resourceType}Category`;

  const CATEGORY_QUERY = `*[_type== '${categoryType}' && categorySlug.current==$categorySlug][0]{_id, altForMainImage, description, categorySlug, mainImage, title, summary}`;

  const CATEGORY_RESOURCES_QUERY = `*[_type=='${resourceType}' && ${resourceType}Category->categorySlug.current==$categorySlug]{_id, altForMainImage, mainImage, title, summary, "slug": ${resourceType}Slug, "category": ${resourceType}Category->{title, categorySlug} }`;

  const categoryData = await client.fetch<ResourceCategory>(
    CATEGORY_QUERY,
    { categorySlug },
    options,
  );

  if (!categoryData) {
    return null;
  }

  const categoryResources = await client.fetch<ListItemData[]>(
    CATEGORY_RESOURCES_QUERY,
    { categorySlug },
    options,
  );

  const mainImageUrl = urlFor(categoryData.mainImage)!.fit("max").url();
  const imageData = await getImage(mainImageUrl);

  return { categoryData, categoryResources, imageData };
}

const RESOURCE_TYPES: ResourceType[] = ["treatment", "training"];
/** fetches the data used for building main navigation */
async function getNavData(): Promise<NavigationDataInterface> {
  const entries = await Promise.all(
    RESOURCE_TYPES.map(async (resource) => {
      const NAV_CATEGORY_QUERY = `*[_type=='${resource}Category']{_id, title, "slug":categorySlug}`;

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

export {
  getCategoryPageData,
  getNavData,
  getCategoriesNavData,
  getAllResources,
  getAllTrainings,
};
