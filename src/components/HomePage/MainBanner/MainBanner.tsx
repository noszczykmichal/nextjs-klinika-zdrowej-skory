import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

function MainBanner() {
  return (
    <div className="max-h-[70vh] rounded-[var(--big-border-radius)] overflow-hidden ">
      <div className="relative flex items-center justify-center">
        <Image
          className="max-h-[200px] w-full object-cover"
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
          className="absolute w-[80%] top-1/4 text-center font-extralight"
        >
          Kosmetologia na światowym poziomie
        </h1>
      </div>
      <Image
        src={pkBannerRight}
        alt=""
        width={1000}
        height={1080}
        className="max-h-[530px] w-full h-full object-cover object-center overflow-visible"
      />
    </div>
  );
}

export default MainBanner;
