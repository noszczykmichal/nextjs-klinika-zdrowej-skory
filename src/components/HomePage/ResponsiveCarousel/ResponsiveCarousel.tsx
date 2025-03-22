"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

import zabieg from "@/assets/zabieg-1024x342.jpg";
import landscape from "@/assets/us-placeholder-landscape-1024x683.jpg";
import marble from "@/assets/marble-1024x684.jpg";
import leavesBottle from "@/assets/us-placeholder-square-1024x1024.jpg";
import fern from "@/assets/us-placeholder-portrait-683x1024.jpg";

export function ResponsiveCarousel() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const carouselConfig = [
    { id: "needles", src: zabieg.src },
    {
      id: "landscape",
      src: landscape.src,
    },
    { id: "marble", src: marble.src },
    {
      id: "leaves-bottle",
      src: leavesBottle.src,
    },
    { id: "fern", src: fern.src },
  ];

  return (
    <div
      style={{ gridTemplateColumns: "300px 1fr" }}
      className="grid h-full w-[100%] px-[50px] py-[55px] gap-x-[50px] bg-[var(--green-100)] rounded-[var(--primary-border-radius)]"
    >
      <div className="flex flex-col gap-[30px] text-white">
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
          className="px-[34px] py-[16px] border-2 border-white rounded-[60px]"
          style={{ width: "fit-content" }}
        >
          Wszystkie zabiegi
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {carouselConfig.map((photo, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 pl-[34px]"
            >
              <div className="max-w-[250px]">
                <Card className="py-0 h-[250px] overflow-hidden border-none rounded-[var(--primary-border-radius)]">
                  <CardContent className="flex aspect-square items-center justify-center px-0 ">
                    {/* <Image
                      src={photo.src}
                      width={250}
                      height={250}
                      alt=""
                      className="object-contain"
                    /> */}
                    <div
                      style={{
                        backgroundImage: `url(${photo.src})`,
                        height: "100%",
                        width: "100%",
                        // objectFit: "contain",
                        // objectPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        overflow: "hidden",
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
