import { client } from "@/sanity/client";

import {
  ResourceType,
  SitemapCategoryEntry,
  SitemapResourceEntry,
} from "@/types/types";

const RESOURCE_TYPES: ResourceType[] = ["treatment", "training"];

async function getResourcesSiteMapData() {
  const entries = await Promise.all(
    RESOURCE_TYPES.map(async (resource) => {
      const RESOURCE_QUERY = `*[_type == "${resource}" && defined(${resource}Slug.current)]{
        "categorySlug": ${resource}Category->categorySlug.current,
      "slug": ${resource}Slug.current,
      _updatedAt
    }`;

      const queryResult =
        await client.fetch<SitemapResourceEntry[]>(RESOURCE_QUERY);

      return [resource, queryResult] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<
    ResourceType,
    SitemapResourceEntry[]
  >;
}

async function getCategoriesSitemapData() {
  const entries = await Promise.all(
    RESOURCE_TYPES.map(async (resource) => {
      const CATEGORY_QUERY = `*[_type == "${resource}Category" && defined(categorySlug.current)]{
      "slug": categorySlug.current,
      _updatedAt
    }`;

      const queryResult =
        await client.fetch<SitemapCategoryEntry[]>(CATEGORY_QUERY);

      return [resource, queryResult] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<
    ResourceType,
    SitemapCategoryEntry[]
  >;
}

async function getPostsSiteMapData() {
  const RESOURCE_QUERY = `*[_type == "post" && defined(slug.current)]{
        "categorySlug": category->categorySlug.current,
      "slug": slug.current,
      _updatedAt
    }`;

  const queryResult =
    await client.fetch<SitemapResourceEntry[]>(RESOURCE_QUERY);

  return queryResult;
}

async function getPostCategoriesSitemapData() {
  const CATEGORY_QUERY = `*[_type == "category" && defined(categorySlug.current)]{
      "slug": categorySlug.current,
      _updatedAt
    }`;

  const queryResult =
    await client.fetch<SitemapCategoryEntry[]>(CATEGORY_QUERY);

  return queryResult;
}

export {
  getResourcesSiteMapData,
  getCategoriesSitemapData,
  getPostsSiteMapData,
  getPostCategoriesSitemapData,
};
