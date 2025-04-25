import type { PortableTextBlock } from "@portabletext/types";

export type NavigationColorVariant = "white" | "dark";

export type IconVariants = "facebook" | "instagram" | "booksy";

export interface SocialIcon {
  name: IconVariants;
  href: string;
  className: string;
}

export interface ParagraphContent {
  _key: string;
  content: string;
  paragraphTitle: string;
}

export interface ImageDetails {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface PostDetails {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage: ImageDetails;
  altForMainImage: string;
  author: { _ref: string; _type: "reference" };
  category: CategoryDetails;
  summary: string;
  contentSections: ParagraphContent[];
  treatmentGroup: {
    groupSlug: { current: string };
  };
  treatment: {
    treatmentGroup: { groupSlug: { current: string } };
    treatmentSlug: { current: string };
  };
}

export interface CategoryDetails {
  title: string;
  categorySlug: { current: string };
}

export interface TreatmentDetails {
  altForMainImage: string;
  description: PortableTextBlock[];
  mainImage: ImageDetails;
  summary: string;
  title: string;
  treatmentGroup: { groupSlug: { current: string }; title: string };
}

export interface TreatmentGroup {
  groupSlug: { current: string };
  title: string;
  _id: string;
}
