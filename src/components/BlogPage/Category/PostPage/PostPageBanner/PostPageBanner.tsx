import Image from "next/image";

import { PostDetails } from "@/types/types";
import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface PostPageBannerProps {
  postDetails: PostDetails;
}

export default function PostPageBanner({ postDetails }: PostPageBannerProps) {
  const {
    imageData,
    title: headerText,
    treatment,
    treatmentGroup: group,
    altForMainImage,
  } = postDetails;

  const treatmentGroup = treatment?.treatmentGroup.groupSlug.current;

  const wrapperClasses = "min-w-[130px] h-[36px] xs:min-w-[180px]";
  const contentClasses =
    "whitespace-nowrap text-[14px] before:hidden xs:before:block xs:text-[16px] px-1";

  const buttonHref = treatment
    ? `/zabiegi/${treatmentGroup}/${treatment.treatmentSlug.current}`
    : `/zabiegi/${group?.groupSlug.current}`;
  const buttonCaption = treatment ? "Przejdź do zabiegu" : "Poznaj ofertę";

  return (
    <div className="mt-[20px] h-[625px] rounded-[var(--big-border-radius)] sm:mt-0 sm:flex sm:h-[70vh] sm:max-h-[500px]">
      <div className="relative flex h-[40%] items-center justify-center sm:h-full sm:w-[50%]">
        <Image
          className="w-full rounded-tl-[var(--big-border-radius)] rounded-tr-[var(--big-border-radius)] object-cover sm:rounded-tr-none sm:rounded-bl-[var(--big-border-radius)]"
          src={pkBannerLeft}
          alt=""
          fill
          placeholder="blur"
          blurDataURL={pkBannerLeft.blurDataURL}
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="xxs:p-5 absolute flex h-full w-full flex-col items-center justify-between p-3 lg:gap-[50px] lg:py-10">
          <h1 className="heading-post-banner w-[90%] text-center font-extralight">
            {headerText}
          </h1>

          <div className="flex h-[25%] w-full items-end justify-between sm:flex-col sm:items-center lg:flex-row">
            <StyledButton
              href="/blog"
              wrapperClasses={wrapperClasses}
              contentClasses={contentClasses}
            >
              Powrót
            </StyledButton>

            <StyledButton
              href={buttonHref}
              wrapperClasses={wrapperClasses}
              contentClasses={contentClasses}
            >
              {buttonCaption}
            </StyledButton>
          </div>
        </div>
      </div>
      <div className="relative h-[60%] sm:h-full sm:w-[50%]">
        {imageData && (
          <Image
            src={imageData.img.src}
            alt={altForMainImage}
            placeholder={imageData?.base64 ? "blur" : "empty"}
            blurDataURL={imageData.base64}
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
