import { PortableTextComponents } from "next-sanity";
import Image from "next/image";

import { urlFor } from "./utilityFunctions";

export const portableTextComponentConfig: PortableTextComponents = {
  marks: {
    underline: ({ children }) => (
      <span className="border-b border-amber-800 pb-1">{children}</span>
    ),
  },
  types: {
    image: ({ value }) => {
      const width = value.asset?.metadata?.dimensions?.width;
      const height = value.asset?.metadata?.dimensions?.height;

      return (
        <div className="relative py-3">
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
  },
  block: {
    normal: ({ children }) => <p className="mb-[16px]">{children}</p>,
    h3: ({ children }) => (
      <h3 className="mt-[40px] mb-[8px] text-[25px] leading-normal">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-[16px] list-disc space-y-[6px] pl-[20px]">
        {children}
      </ul>
    ),
  },
};
