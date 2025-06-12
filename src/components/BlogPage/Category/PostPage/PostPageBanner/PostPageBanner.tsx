import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Image from "next/image";

import { PostDetails } from "@/types/types";
import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface PostPageBannerProps {
  postDetails: PostDetails;
}

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function PostPageBanner({ postDetails }: PostPageBannerProps) {
  const {
    mainImage,
    title: headerText,
    treatment,
    treatmentGroup: group,
    altForMainImage,
  } = postDetails;
  const imageUrl = mainImage ? urlFor(mainImage)!.fit("max").url() : null;
  const treatmentGroup = treatment?.treatmentGroup.groupSlug.current;

  const wrapperClasses = "min-w-[130px] h-[36px] xs:min-w-[180px]";
  const contentClasses =
    "whitespace-nowrap text-[14px] before:hidden xs:before:block xs:text-[16px]";

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
            {treatment && (
              <StyledButton
                href={`/zabiegi/${treatmentGroup}/${treatment.treatmentSlug.current}`}
                wrapperClasses={wrapperClasses}
                contentClasses={contentClasses}
              >
                Pejdź do zabiegu
              </StyledButton>
            )}
            {group && (
              <StyledButton
                href={`/zabiegi/${group.groupSlug.current}`}
                wrapperClasses={wrapperClasses}
                contentClasses={contentClasses}
              >
                Pejdź do zabiegu
              </StyledButton>
            )}
          </div>
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
