import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

function MainBanner() {
  return (
    <div className="flex rounded-[var(--big-border-radius)] overflow-hidden max-h-[500px]">
      <div className="w-[50%] relative flex items-center justify-center">
        <Image
          className="h-full w-full object-cover"
          src={pkBannerLeft}
          alt=""
          width={1000}
          height={1000}
        />
        <h1
          style={{
            fontSize: "var(--font-size-banner)",
            lineHeight: "var(--font-size-banner)",
          }}
          className="absolute w-[80%] font-extralight"
        >
          Kosmetologia na światowym poziomie
        </h1>
      </div>
      <Image
        src={pkBannerRight}
        alt=""
        width={1000}
        height={1080}
        className="w-[50%] object-cover"
      />
    </div>
  );
}

export default MainBanner;
