import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

interface MainBannerProps {
  headerText: string;
}

export default function MainBanner({ headerText }: MainBannerProps) {
  return (
    <div className="sm:flex h-[70vh] max-h-[500px] rounded-[var(--big-border-radius)] overflow-hidden">
      <div className="relative h-[40%] sm:w-[50%] sm:h-full flex items-center justify-center">
        <Image
          className="w-full object-cover"
          src={pkBannerLeft}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <h1 className="absolute w-[80%] font-extralight main-banner-fSize-HomeP">
          {headerText}
        </h1>
      </div>
      <div className="h-[60%] relative sm:w-[50%] sm:h-full">
        <Image
          src={pkBannerRight}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
