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
        <div className="absolute h-full w-full p-3 xxs:p-5 flex flex-col justify-between lg:gap-[50px] lg:py-10">
          <h1 className="heading-post-banner w-[90%] font-extralight text-center">
            {headerText}
          </h1>

          <div className="h-[25%] w-full flex items-end sm:flex-col lg:flex-row justify-between sm:items-center ">
            <StyledButton href="/blog">Powrót</StyledButton>
            {treatment && (
              <StyledButton
                href={`/zabiegi/${treatmentGroup}/${treatment.treatmentSlug.current}`}
              >
                Pejdź do zabiegu
              </StyledButton>
            )}
            {group && (
              <StyledButton href={`/zabiegi/${group.groupSlug.current}`}>
                Pejdź do zabiegu
              </StyledButton>
            )}
          </div>
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
