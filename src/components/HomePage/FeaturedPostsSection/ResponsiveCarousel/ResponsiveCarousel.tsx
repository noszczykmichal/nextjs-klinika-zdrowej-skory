"use client";

import { useState, useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ListItemData } from "@/types/types";
import FeaturedPostsList from "@/components/HomePage/FeaturedPostsSection/ResponsiveCarousel/FeaturedPostsList/FeaturedPostsList";

interface ResponsiveCarouselProps {
  posts: ListItemData[];
}

export function ResponsiveCarousel({ posts }: ResponsiveCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const prefersReducedMotion = usePrefersReducedMotion();
  const controlButtonsWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const resumeAutoplayHandler = (event: MouseEvent) => {
    const wrapper = controlButtonsWrapperRef.current;

    if (wrapper && !wrapper.contains(event.target as Node)) {
      plugin.current.play();
      document.removeEventListener("click", resumeAutoplayHandler);
    }
  };

  const onControlButtonClick = (index: number) => () => {
    api?.scrollTo(index);
    plugin.current.stop();

    document.addEventListener("click", resumeAutoplayHandler);
  };

  const controlButtons = (
    <div
      className="py-2 flex gap-[10px] lg:invisible"
      ref={controlButtonsWrapperRef}
    >
      {Array.from({ length: count }).map((_slide, index) => (
        <button
          className={`w-[10px] h-[10px] hover:cursor-pointer rounded-[50%] ${
            current === index + 1
              ? "bg-[var(--black-100)]"
              : "bg-[var(--gray-100)]"
          }`}
          key={index}
          onClick={onControlButtonClick(index)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-[50px]">
      {prefersReducedMotion ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-[90%]"
        >
          <FeaturedPostsList posts={posts} />
          <CarouselPrevious className="lg:hidden ml-[15px] md:ml-[5px] cursor-pointer" />
          <CarouselNext className="lg:hidden mr-[15px] md:mr-[5px] cursor-pointer" />
        </Carousel>
      ) : (
        <>
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <FeaturedPostsList posts={posts} />
          </Carousel>
          {controlButtons}
        </>
      )}
    </div>
  );
}
