"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { type CarouselApi } from "@/components/ui/carousel";

import GalleryLightBox from "@/components/BlogPage/Category/PostPage/GalleryLightBox/GalleryLightBox";
import { GalleryImage } from "@/types/types";

interface PortableTextGalleryProps {
  value: { images: GalleryImage[] };
}

export default function PortableTextGallery({
  value,
}: PortableTextGalleryProps) {
  const { images } = value;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (api && activeIndex !== null) {
      api.scrollTo(activeIndex);
    }
  }, [api, activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close]);

  const lightbox = activeIndex !== null && (
    <GalleryLightBox
      setApi={setApi}
      activeIndex={activeIndex}
      images={images}
      onClose={close}
    />
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 py-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((img, i) => (
          <button
            key={img._key}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square overflow-hidden rounded-[var(--big-border-radius)]"
          >
            <Image
              src={img.asset.url}
              alt={img.alt || ""}
              fill
              placeholder={img.asset.metadata?.lqip ? "blur" : "empty"}
              blurDataURL={img.asset.metadata?.lqip}
              className="cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {mounted && lightbox && createPortal(lightbox, document.body)}
    </>
  );
}
