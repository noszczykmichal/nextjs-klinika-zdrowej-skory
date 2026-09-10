"use client";

import { useState, useRef, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import clsx from "clsx";

import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ListItemData } from "@/types/types";
import FeaturedPostsList from "@/components/HomePage/FeaturedPostsArticle/ResponsiveCarousel/FeaturedPostsList/FeaturedPostsList";

interface ResponsiveCarouselProps {
  posts: ListItemData[];
}

export function ResponsiveCarousel({ posts }: ResponsiveCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const prefersReducedMotion = usePrefersReducedMotion();

  const resumeAutoplayHandler = () => {
    setTimeout(() => {
      plugin.current?.play();
    }, 3000);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    const resizeHandler = () => {
      setCount(api.scrollSnapList().length);
    };

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    window.addEventListener("resize", resizeHandler);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("pointerUp", resumeAutoplayHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [api]);

  const onControlButtonClick = (index: number) => () => {
    api?.scrollTo(index);
    plugin.current.stop();
    resumeAutoplayHandler();
  };

  const controlButtons = (
    <div className="flex gap-2.5 py-2 lg:invisible">
      {Array.from({ length: count }).map((_slide, index) => (
        <button
          aria-label={`Przejdź do slajdu ${index + 1}`}
          className={clsx(
            "h-2.5 w-2.5 rounded-[50%] hover:cursor-pointer",
            current === index + 1 ? "bg-black-100" : "bg-gray-100",
          )}
          key={index}
          onClick={onControlButtonClick(index)}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-12.5">
      {prefersReducedMotion ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-[90%]"
        >
          <FeaturedPostsList posts={posts} />
          <CarouselPrevious className="ml-3.75 cursor-pointer md:ml-1.25 lg:hidden" />
          <CarouselNext className="mr-3.75 cursor-pointer md:mr-1.25 lg:hidden" />
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
