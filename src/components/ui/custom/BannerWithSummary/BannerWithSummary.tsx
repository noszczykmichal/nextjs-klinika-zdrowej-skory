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
    <div className="mt-[20px] h-[625px] rounded-[var(--big-border-radius)] sm:mt-0 sm:flex sm:h-[70vh] sm:max-h-[500px]">
      <div className="relative flex h-[40%] items-center justify-center sm:h-full sm:w-[50%]">
        <Image
          className="w-full rounded-tl-[var(--big-border-radius)] rounded-tr-[var(--big-border-radius)] object-cover sm:rounded-tr-none sm:rounded-bl-[var(--big-border-radius)]"
          src={pkBannerLeft}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="xxs:p-5 xxs:gap-[20px] absolute flex h-full w-full flex-col items-end justify-center p-3 sm:gap-[30px] lg:gap-[50px] lg:py-10">
          <h1 className="heading-post-banner w-[90%] text-right font-extralight">
            {headerText}
          </h1>
          <p className="text-right text-[14px] lg:text-[16px]">{summary}</p>
        </div>
      </div>
      <div className="relative h-[60%] sm:h-full sm:w-[50%]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={altForMainImage}
            fill
            className="rounded-br-[var(--big-border-radius)] rounded-bl-[var(--big-border-radius)] object-cover sm:rounded-tr-[var(--big-border-radius)] sm:rounded-bl-none"
            priority
            sizes="(max-width: 640px) 100vw, (min-width: 641px) min(50vw, 650px)"
          />
        )}
      </div>
    </div>
  );
}
