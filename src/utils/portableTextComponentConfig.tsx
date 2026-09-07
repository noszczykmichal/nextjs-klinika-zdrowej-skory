import { PortableTextComponents } from "next-sanity";

import PortableTextImage from "@/components/PortableText/PortableTextImage/PortableTextImage";
import PortableTextGallery from "@/components/PortableText/PortableTextGallery/PortableTextGallery";
import PortableTextTable from "@/components/PortableText/PortableTextTable/PortableTextTable";

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
    blockContentImage: PortableTextImage,
    gallery: PortableTextGallery,
    tableWithCaption: PortableTextTable,
  },
  block: {
    normal: ({ children }) => <p className="mb-4 text-justify">{children}</p>,
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
    number: ({ children }) => (
      <ol className="my-2 list-decimal space-y-1.5 pl-5">{children}</ol>
    ),
  },
};
