import { HTMLInputTypeAttribute } from "react";
import type { PortableTextBlock } from "@portabletext/types";

export type IconVariants = "facebook" | "instagram" | "b-visit";

export interface SocialIcon {
  name: IconVariants;
  href: string;
  className: string;
}

export interface ImageDetails {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface CategoryDetails {
  title: string;
  categorySlug: { current: string };
}

export interface ListItemData {
  _id: string;
  altForMainImage: string;
  category: CategoryDetails;
  mainImage: ImageDetails;
  slug: { current: string };
  summary: string;
  title: string;
}

export interface PostDetails extends ListItemData {
  publishedAt: string;
  postContent: PortableTextBlock[];
  treatmentGroup: {
    groupSlug: { current: string };
  };
  treatment: {
    treatmentGroup: { groupSlug: { current: string } };
    treatmentSlug: { current: string };
  };
}

export interface TreatmentProcedure {
  altForMainImage: string;
  description: PortableTextBlock[];
  mainImage: ImageDetails;
  summary: string;
  title: string;
}

export interface TreatmentDetails extends TreatmentProcedure {
  treatmentGroup: { groupSlug: { current: string }; title: string };
}

export interface TreatmentGroup extends TreatmentProcedure {
  _id: string;
  groupSlug: { current: string };
}

export type TopLevelRoute = "blog" | "zabiegi";

export interface RouteData {
  routeName: string;
  url?: string;
}

export interface HeroArticleData {
  id: number;
  paragraphContent: string;
}

export interface FormFieldConfig {
  component?: "input" | "textarea";
  type?: HTMLInputTypeAttribute;
  name: string;
  label: string;
  validator: (v: string) => string | undefined;
}

export interface ErrorState {
  errorMessage: string;
  hasError: boolean;
}
