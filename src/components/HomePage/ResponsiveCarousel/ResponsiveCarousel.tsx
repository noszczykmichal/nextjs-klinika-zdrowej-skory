"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { PostDetails } from "@/types/types";
import FeaturedPostsList from "../FeaturedPostsSection/FeaturedPostsList/FeaturedPostsList";

interface ResponsiveCarouselProps {
  posts: Partial<PostDetails>[];
}

export function ResponsiveCarousel({ posts }: ResponsiveCarouselProps) {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      {prefersReducedMotion ? (
        <div className="px-[20px] py-[55px] flex flex-col items-center gap-[50px] bg-[var(--green-100)] rounded-[var(--big-border-radius)]">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-[90%]"
          >
            <FeaturedPostsList posts={posts} />
            <CarouselPrevious className="ml-[15px] md:ml-[5px] cursor-pointer" />
            <CarouselNext className="mr-[15px] md:mr-[5px] cursor-pointer" />
          </Carousel>
        </div>
      ) : (
        <div className="px-[20px] py-[55px] flex flex-col gap-[50px] bg-[var(--green-100)] rounded-[var(--big-border-radius)]">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <FeaturedPostsList posts={posts} />
          </Carousel>
        </div>
      )}
    </>
  );
}
