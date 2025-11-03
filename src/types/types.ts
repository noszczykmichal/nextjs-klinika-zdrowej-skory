import { HTMLInputTypeAttribute } from "react";
import type { PortableTextBlock } from "@portabletext/types";

export type IconVariants = "facebook" | "instagram" | "booksy";

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

export interface PlaiceholderResult {
  img: {
    src: string;
    height: number;
    width: number;
  };

  base64: string;
}

interface BaseContentData {
  title: string;
  altForMainImage: string;
  summary: string;
}

export interface BannerData extends BaseContentData {
  imageData: PlaiceholderResult | null;
}

export interface ListItemData extends BannerData {
  _id?: string;
  category: CategoryDetails;
  slug?: { current: string };
  mainImage: ImageDetails;
}

export interface PostDetails extends ListItemData {
  publishedAt: string;
  postContent: PortableTextBlock[];
  treatmentGroup: {
    groupSlug: { current: string };
  } | null;
  treatment: {
    treatmentGroup: { groupSlug: { current: string } };
    treatmentSlug: { current: string };
  } | null;
}

export interface TreatmentProcedure extends BaseContentData {
  description: PortableTextBlock[];
  mainImage: ImageDetails;
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
  validator: (_v: string) => string | undefined;
}

export interface ErrorState {
  errorMessage: string;
  hasError: boolean;
}
