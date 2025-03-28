import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

function MainBanner() {
  return (
    <div className="sm:flex h-[70vh] rounded-[var(--big-border-radius)] overflow-hidden ">
      <div className="relative h-[40%] sm:w-[50%] sm:h-full flex items-center justify-center">
        <Image className="w-full object-cover" src={pkBannerLeft} alt="" fill />
        <h1
          style={{
            fontSize: "var(--font-big-banner)",
            lineHeight: "var(--leading-big-banner)",
          }}
          className="absolute w-[80%] font-extralight sm:text-[var(--font-small-banner)]"
        >
          Kosmetologia na światowym poziomie
        </h1>
      </div>
      <div className="h-[60%] relative sm:w-[50%] sm:h-full">
        <Image src={pkBannerRight} alt="" fill className="object-cover" />
      </div>
    </div>
  );
}

export default MainBanner;
