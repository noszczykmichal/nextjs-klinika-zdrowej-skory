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

  function latest(dates: (string | undefined)[]) {
    const times = dates.filter(Boolean).map((d) => new Date(d!).getTime());
    return times.length ? new Date(Math.max(...times)) : undefined;
  }

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
      lastModified: latest([
        c._updatedAt,
        ...treatments
          .filter((t: SitemapResourceEntry) => t.categorySlug === c.slug)
          .map((t: SitemapResourceEntry) => t._updatedAt),
      ]),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const trainingCategoryEntries = trainingCategories.map(
    (c: SitemapCategoryEntry) => ({
      url: `${BASE_URL}/szkolenia/${c.slug}`,
      lastModified: latest([
        c._updatedAt,
        ...trainings
          .filter((t: SitemapResourceEntry) => t.categorySlug === c.slug)
          .map((t: SitemapResourceEntry) => t._updatedAt),
      ]),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  );

  const postCategoryEntries = postCategories.map((c: SitemapCategoryEntry) => ({
    url: `${BASE_URL}/blog/${c.slug}`,
    lastModified: latest([
      c._updatedAt,
      ...posts
        .filter((p: SitemapResourceEntry) => p.categorySlug === c.slug)
        .map((p: SitemapResourceEntry) => p._updatedAt),
    ]),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Static routes
  const staticRoutes = [
    { url: BASE_URL, changeFrequency: "weekly" as const, priority: 1.0 },
    {
      url: `${BASE_URL}/zabiegi`,
      lastModified: latest(treatments.map((t) => t._updatedAt)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/szkolenia`,
      lastModified: latest(trainings.map((t) => t._updatedAt)),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latest(posts.map((t) => t._updatedAt)),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/o-nas`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/polityka-prywatnosci`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

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
