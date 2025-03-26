"use client";

// import { useRef } from "react";
// import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
// import Image from "next/image";

import zabieg from "@/assets/zabieg-1024x342.jpg";
import landscape from "@/assets/us-placeholder-landscape-1024x683.jpg";
import marble from "@/assets/marble-1024x684.jpg";
import leavesBottle from "@/assets/us-placeholder-square-1024x1024.jpg";
import fern from "@/assets/us-placeholder-portrait-683x1024.jpg";

export function ResponsiveCarousel() {
  // const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

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
    <div className="px-[20px] py-[55px] bg-[var(--green-100)]">
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
          className="px-[34px] py-[16px] border-2 border-white rounded-[var(--big-border-radius)]"
          style={{ width: "fit-content" }}
        >
          Wszystkie zabiegi
        </Link>
      </div>
      <div className="flex items-end">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {carouselConfig.map((photo, index) => {
              console.log(photo.src);
              return (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div
                          style={{ backgroundImage: `url('${photo.src.src}')` }}
                          className="h-full w-full bg-no-repeat bg-cover bg-center"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* <CarouselPrevious />
      <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
}
