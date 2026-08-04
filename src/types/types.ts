import { HTMLInputTypeAttribute } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type IconVariants = "facebook" | "instagram" | "booksy";

interface SlugField {
  current: string;
}

export interface SocialIcon {
  name: IconVariants;
  href: string;
  className: string;
}

export interface CategoryDetails {
  title: string;
  categorySlug: SlugField;
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
  slug?: SlugField;
  mainImage: SanityImageSource;
}

export interface PostDetails extends ListItemData {
  publishedAt: string;
  postContent: PortableTextBlock[];
  treatmentCategory: {
    categorySlug: { current: string };
  } | null;
  treatment: {
    treatmentCategory: SlugField;
    treatmentSlug: SlugField;
  } | null;
}

export interface Resource extends BaseContentData {
  description: PortableTextBlock[];
  mainImage: SanityImageSource;
}

export interface ResourceDetails extends Resource {
  category: CategoryDetails;
}

export interface ResourceCategory extends Resource {
  _id: string;
  categorySlug: SlugField;
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

export interface GalleryImage {
  _key: string;
  alt?: string;
  asset: {
    url: string;
    metadata: { dimensions: { width: number; height: number }; lqip?: string };
  };
}

export interface NavigationDataInterface {
  [key: string]: Partial<ListItemData>[];
}

export type ResourceType = "treatment" | "training";

export interface NavConfigItem {
  id: string;
  label: string;
  href: string;
  resourceType?: ResourceType;
}
