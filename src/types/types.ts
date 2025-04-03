export type NavigationColorVariant = "white" | "dark";

export type IconVariants = "facebook" | "instagram" | "booksy";

export interface SocialIcon {
  name: IconVariants;
  href: string;
  className: string;
}

export interface PostDetails {
  _id: string;
  title: string;
  slug: { current: string; _type: "slug" };
  publishedAt: string;
  mainImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}
