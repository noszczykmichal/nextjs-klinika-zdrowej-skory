import Image, { StaticImageData } from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import bannerRightImage from "@/assets/home_page_banner_right.jpg";

interface MainBannerProps {
  headerText: string;
  customImage?: StaticImageData;
  customAlt?: string;
}

export default function MainBanner({
  headerText,
  customImage,
  customAlt,
}: MainBannerProps) {
  return (
    <div className="sm:flex h-[70vh] max-h-[500px] rounded-[var(--big-border-radius)] overflow-hidden mt-[20px] sm:mt-0">
      <div className="relative h-[40%] min-h-[250px] sm:w-[50%] sm:h-full flex items-center justify-center">
        <Image
          className="w-full object-cover"
          src={pkBannerLeft}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <h1 className="absolute w-full text-center font-extralight text-[30px] whitespace-nowrap xxs:text-(length:--font-big-banner) sm:text-(length:--font-small-banner) lg:text-(length:--font--medium-banner) sm:whitespace-normal">
          {headerText}
        </h1>
      </div>
      <div className="h-[60%] relative sm:w-[50%] sm:h-full">
        <Image
          src={customImage || bannerRightImage}
          alt={
            customAlt ||
            "Olga Noszczyk trzymająca ampułko strzykawkę z preparatem do stymulacji skóry."
          }
          fill
          className="object-cover object-top"
          priority
          sizes="(max-width: 640px) 100vw, (min-width: 641px) min(50vw, 650px)"
        />
      </div>
    </div>
  );
}
