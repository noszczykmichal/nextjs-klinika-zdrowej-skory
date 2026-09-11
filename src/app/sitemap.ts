import { MetadataRoute } from "next";

import {
  getResourcesSiteMapData,
  getCategoriesSitemapData,
  getPostsSiteMapData,
  getPostCategoriesSitemapData,
} from "@/utils/sitemapHelpers";
import { SitemapResourceEntry, SitemapCategoryEntry } from "@/types/types";

const BASE_URL = "https://www.olganoszczyk.pl";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { treatment: treatments, training: trainings } =
    await getResourcesSiteMapData();
  const { treatment: treatmentCategories, training: trainingCategories } =
    await getCategoriesSitemapData();
  const posts = await getPostsSiteMapData();
  const postCategories = await getPostCategoriesSitemapData();

  const treatmentEntries = treatments.map((t: SitemapResourceEntry) => ({
    url: `${BASE_URL}/zabiegi/${t.categorySlug}/${t.slug}`,
    lastModified: t._updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const trainingEntries = trainings.map((t: SitemapResourceEntry) => ({
    url: `${BASE_URL}/szkolenia/${t.categorySlug}/${t.slug}`,
    lastModified: t._updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postEntries = posts.map((t: SitemapResourceEntry) => ({
    url: `${BASE_URL}/blog/${t.categorySlug}/${t.slug}`,
    lastModified: t._updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const treatmentCategoryEntries = treatmentCategories.map(
    (c: SitemapCategoryEntry) => ({
      url: `${BASE_URL}/zabiegi/${c.slug}`,
      lastModified: c._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const trainingCategoryEntries = trainingCategories.map(
    (c: SitemapCategoryEntry) => ({
      url: `${BASE_URL}/szkolenia/${c.slug}`,
      lastModified: c._updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const postCategoryEntries = postCategories.map((c: SitemapCategoryEntry) => ({
    url: `${BASE_URL}/blog/${c.slug}`,
    lastModified: c._updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Static routes
  const staticRoutes = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1.0 },
    {
      url: `${BASE_URL}/zabiegi`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szkolenia`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/o-nas`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ].map((r) => ({ ...r, lastModified: new Date() }));

  return [
    ...staticRoutes,
    ...treatmentEntries,
    ...trainingEntries,
    ...postEntries,
    ...treatmentCategoryEntries,
    ...trainingCategoryEntries,
    ...postCategoryEntries,
  ];
}
