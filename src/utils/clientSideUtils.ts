import { client } from "@/sanity/client";
import { notFound, permanentRedirect } from "next/navigation";

import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { MainRoute } from "@/types/types";

export const formatDate = (isoString: string, locale: string = "pl-PL") => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const { projectId, dataset } = client.config();

export const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

/**
 * Ensures the category segment in the URL matches the resource's category in Sanity.
 * Redirects (308) to the canonical URL on mismatch; returns 404 if the resource has no category.
 * Must not be called inside try/catch – notFound() and permanentRedirect() work by throwing.
 */
export const categoryGuard = ({
  categoryFromParams,
  categorySlugFromSanity,
  resourceSlugFromParams,
  mainRoute,
}: {
  categoryFromParams: string;
  categorySlugFromSanity: string | undefined;
  resourceSlugFromParams: string;
  mainRoute: MainRoute;
}): void => {
  if (!categorySlugFromSanity) {
    notFound();
  }

  if (categoryFromParams !== categorySlugFromSanity) {
    permanentRedirect(
      `/${mainRoute}/${categorySlugFromSanity}/${resourceSlugFromParams}`,
    );
  }
};
