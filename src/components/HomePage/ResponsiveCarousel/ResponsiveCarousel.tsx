"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";


import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import zabieg from "@/assets/zabieg-1024x342.jpg";
import landscape from "@/assets/us-placeholder-landscape-1024x683.jpg";
import marble from "@/assets/marble-1024x684.jpg";
import leavesBottle from "@/assets/us-placeholder-square-1024x1024.jpg";
import fern from "@/assets/us-placeholder-portrait-683x1024.jpg";

export function ResponsiveCarousel() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const prefersReducedMotion = usePrefersReducedMotion();

  const carouselConfig = [
    { id: "needles", src: zabieg },
    {
      id: "landscape",
      src: landscape,
    },
    { id: "marble", src: marble },
    {
      id: "leaves-bottle",
      src: leavesBottle,
    },
    { id: "fern", src: fern },
  ];

  return (
    <>
      {prefersReducedMotion ? (
        <div className="px-[20px] py-[55px] flex flex-col items-center gap-[50px] bg-[var(--green-100)] rounded-[var(--big-border-radius)]">
          <div className="w-[90%] sm:px-[17px] flex flex-col gap-[30px] text-white">
            <h3
              style={{
                fontSize: "var(--font-size-h2)",
              }}
              className="font-extralight"
            >
              Zabiegi
            </h3>
            <p className="text-[17px]">
              Terapie dostosowane do wieku, problemu oraz oczekiwań klienta
            </p>
            <Link
              href="/zabiegi"
              className="px-[34px] py-[16px] border-2 border-white rounded-[var(--big-border-radius)]"
              style={{ width: "fit-content" }}
            >
              Wszystkie zabiegi
            </Link>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-[90%]"
          >
            <CarouselContent className="-ml-1">
              {carouselConfig.map((photo) => {
                return (
                  <CarouselItem
                    key={photo.id}
                    className="pl-1 sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 sm:p-[17px]">
                      <Card className="p-0 border-[var(--green-100)] rounded-[var(--big-border-radius)] overflow-hidden">
                        <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                          <Image
                            src={photo.src}
                            alt=""
                            fill
                            className="object-cover w-full h-full"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="ml-[15px] md:ml-[5px]" />
            <CarouselNext className="mr-[15px] md:mr-[5px]" />
          </Carousel>
        </div>
      ) : (
        <div className="px-[20px] py-[55px] flex flex-col gap-[50px] bg-[var(--green-100)] rounded-[var(--big-border-radius)]">
          <div className="sm:px-[17px] flex flex-col gap-[30px] text-white">
            <h3
              style={{
                fontSize: "var(--font-size-h2)",
              }}
              className="font-extralight"
            >
              Zabiegi
            </h3>
            <p className="text-[17px]">
              Terapie dostosowane do wieku, problemu oraz oczekiwań klienta
            </p>
            <Link
              href="/zabiegi"
              className="px-[34px] py-[16px] border-2 border-white rounded-[var(--big-border-radius)]"
              style={{ width: "fit-content" }}
            >
              Wszystkie zabiegi
            </Link>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {carouselConfig.map((photo) => {
                return (
                  <CarouselItem
                    key={photo.id}
                    className="pl-1 sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1 sm:p-[17px]">
                      <Card className="p-0 border-[var(--green-100)] rounded-[var(--big-border-radius)] overflow-hidden">
                        <CardContent className="flex aspect-square items-center justify-center p-0 relative">
                          <Image
                            src={photo.src}
                            alt=""
                            fill
                            className="object-cover w-full h-full"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </>
  );
}
