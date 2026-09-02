import { PortableTextComponents } from "next-sanity";
import Image from "next/image";

import { urlFor } from "@/utils/clientSideUtils";
import PortableTextGallery from "@/components/BlogPage/Category/PostPage/PortableTextGallery/PortableTextGallery";

export const portableTextComponentConfig: PortableTextComponents = {
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    underline: ({ children }) => (
      <span className="border-golden-100 border-b pb-1">{children}</span>
    ),
    textColor: ({ value, children }) => (
      <span style={{ color: value?.color?.hex }}>{children}</span>
    ),
  },
  types: {
    blockContentImage: ({ value }) => {
      const { height, width } = value.asset?.metadata?.dimensions ?? {};
      const sizeClass =
        value.size === "small"
          ? "w-1/2 mx-auto"
          : value.size === "medium"
            ? "w-3/4 mx-auto"
            : "w-full";

      return (
        <div className={`relative py-3 ${sizeClass}`}>
          <Image
            src={urlFor(value.asset)?.fit("max").url() || ""}
            alt={value.alt}
            width={width}
            height={height}
            className="h-auto w-full object-contain"
          />
        </div>
      );
    },
    gallery: PortableTextGallery,
  },
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => (
      <h2 className="text-2xl leading-normal">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="text-xl">{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-2 list-disc space-y-1.5 pl-5">{children}</ul>
    ),
  },
};
