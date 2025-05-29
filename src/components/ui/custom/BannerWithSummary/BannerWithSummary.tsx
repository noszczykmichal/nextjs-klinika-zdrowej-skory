import Image from "next/image";

import { TreatmentProcedure } from "@/types/types";
import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import { urlFor } from "@/utils/utilityFunctions";

interface BannerWithSummaryProps {
  bannerData: TreatmentProcedure;
}

export default function BannerWithSummary({
  bannerData,
}: BannerWithSummaryProps) {
  const { mainImage, title: headerText, summary, altForMainImage } = bannerData;

  const imageUrl = mainImage ? urlFor(mainImage)!.fit("max").url() : null;

  return (
    <div className="h-[625px] sm:flex sm:h-[70vh] sm:max-h-[500px] rounded-[var(--big-border-radius)] mt-[20px] sm:mt-0">
      <div className="relative h-[40%] sm:w-[50%] sm:h-full flex items-center justify-center">
        <Image
          className="w-full object-cover rounded-tr-[var(--big-border-radius)] sm:rounded-tr-none sm:rounded-bl-[var(--big-border-radius)] rounded-tl-[var(--big-border-radius)]"
          src={pkBannerLeft}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute h-full w-full sm:gap-[30px] p-3 xxs:p-5 flex flex-col justify-center xxs:gap-[20px] items-end lg:gap-[50px] lg:py-10">
          <h1 className="heading-post-banner w-[90%] font-extralight text-right">
            {headerText}
          </h1>
          <p className="text-right text-[14px] lg:text-[16px]">{summary}</p>
        </div>
      </div>
      <div className="h-[60%] relative sm:w-[50%] sm:h-full">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={altForMainImage}
            fill
            className="object-cover rounded-br-[var(--big-border-radius)] rounded-bl-[var(--big-border-radius)] sm:rounded-bl-none sm:rounded-tr-[var(--big-border-radius)]"
            priority
            sizes="(max-width: 640px) 100vw, (min-width: 641px) min(50vw, 650px)"
          />
        )}
      </div>
    </div>
  );
}
