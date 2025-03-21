import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

function MainBanner() {
  return (
    <div className="flex rounded-[var(--primary-border-radius)] overflow-hidden max-h-[500px]">
      <div
        className="w-[50%] flex justify-center items-center"
        style={{ backgroundImage: `url(${pkBannerLeft.src})` }}
      >
        <h1
          style={{
            fontSize: "var(--font-size-banner)",
            lineHeight: "var(--font-size-banner)",
          }}
          className="w-[60%] font-extralight"
        >
          Kosmetologia na światowym poziomie
        </h1>
      </div>
      <Image
        src={pkBannerRight}
        alt=""
        width={0}
        height={0}
        className="w-[50%] object-cover"
      />
    </div>
  );
}

export default MainBanner;
