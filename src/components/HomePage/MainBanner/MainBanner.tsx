import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

function MainBanner() {
  return (
    <div className="sm:flex h-[70vh] max-h-[500px] rounded-[var(--big-border-radius)] overflow-hidden ">
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
          Kosmetologia na światowym poziomie
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

export default MainBanner;
