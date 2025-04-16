import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import StyledButton from "@/components/ui/custom/StyledButton/StyledButton";

interface PostPageBannerProps {
  headerText: string;
  publishDate: string;
  imageUrl: string | null;
}

export default function PostPageBanner({
  headerText,
  publishDate,
  imageUrl,
}: PostPageBannerProps) {
  return (
    <div className="sm:flex h-[70vh] max-h-[500px] rounded-[var(--big-border-radius)] overflow-hidden">
      <div className="relative h-[40%] sm:w-[50%] sm:h-full flex items-center justify-center">
        <Image
          className="w-full object-cover"
          src={pkBannerLeft}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute h-full w-full p-5 flex flex-col justify-center gap-[50px]">
          <div className="h-[50%] w-full flex flex-col justify-between">
            <h1 className="w-[80%] font-extralight main-banner-fSize-HomeP text-left">
              {headerText}
            </h1>
            <p className="self-end">{publishDate}</p>
          </div>
          <div className="h-[25%] w-full flex items-end justify-between">
            <StyledButton href="/blog" text="Powrót" />
            <StyledButton href="" text="Pejdź do zabiegu" />
          </div>
        </div>
      </div>
      <div className="h-[60%] relative sm:w-[50%] sm:h-full">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        )}
      </div>
    </div>
  );
}
