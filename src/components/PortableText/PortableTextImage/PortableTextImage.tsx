import Image from "next/image";
import { PortableTextComponentProps } from "next-sanity";

import { urlFor } from "@/utils/clientSideUtils";

interface BlockContentImageValue {
  _type: "blockContentImage";
  _key: string;
  asset?: {
    _ref: string;
    _type: "reference";
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  size?: "small" | "medium" | "full";
}

export default function PortableTextImage({
  value,
}: PortableTextComponentProps<BlockContentImageValue>) {
  if (!value.asset) return null;

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
        alt={value.alt ?? ""}
        width={width}
        height={height}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
