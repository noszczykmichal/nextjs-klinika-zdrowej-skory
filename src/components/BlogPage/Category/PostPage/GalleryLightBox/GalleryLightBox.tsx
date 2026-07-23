/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { GalleryImage } from "@/types/types";
import { X } from "lucide-react";
import Image from "next/image";

interface GalleryLightBoxProps {
  setApi: Dispatch<SetStateAction<CarouselApi | undefined>>;
  activeIndex: number;
  images: GalleryImage[];
  onClose: () => void;
}

export default function GalleryLightBox({
  setApi,
  activeIndex,
  images,
  onClose,
}: GalleryLightBoxProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white"
        aria-label="Zamknij"
      >
        <X size={32} className="cursor-pointer" />
      </button>

      <div
        className="mx-auto max-w-[90vw] sm:w-full sm:max-w-md md:max-w-xl lg:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel
          setApi={setApi}
          opts={{ align: "start", startIndex: activeIndex ?? 0, loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem
                key={img._key}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="relative flex aspect-square items-center justify-center p-6">
                      <Image
                        src={img.asset.url}
                        alt={img.alt || ""}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        priority
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden cursor-pointer lg:flex" />
          <CarouselNext className="hidden cursor-pointer lg:flex" />
        </Carousel>
      </div>
    </div>
  );
}
