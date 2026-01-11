import { client } from "@/sanity/client";

import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

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
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
