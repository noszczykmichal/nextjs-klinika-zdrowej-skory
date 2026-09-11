import Image, { StaticImageData } from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import bannerRightImage from "@/assets/home_page_banner_right.jpg";

interface MainBannerProps {
  headerText: string;
  customImage?: StaticImageData;
  customAlt?: string;
}

export default function MainBanner({
  headerText,
  customImage,
  customAlt,
}: MainBannerProps) {
  const blurData = customImage
    ? customImage.blurDataURL
    : bannerRightImage.blurDataURL;

  return (
    <div className="rounded-big mt-5 h-156.25 sm:mt-0 sm:flex sm:h-[70vh] sm:max-h-125">
      <div className="relative flex h-[40%] items-center justify-center sm:h-full sm:w-[50%]">
        <Image
          className="rounded-tl-big rounded-tr-big sm:rounded-bl-big w-full object-cover sm:rounded-tr-none"
          src={pkBannerLeft}
          alt=""
          fill
          placeholder="blur"
          blurDataURL={pkBannerLeft.blurDataURL}
          priority
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <h1 className="whitespace-wrap xxs:text-(length:--font-big-banner) absolute w-full text-center text-[30px] font-extralight sm:text-(length:--font-small-banner) sm:whitespace-normal lg:text-(length:--font--medium-banner)">
          {headerText}
        </h1>
      </div>
      <div className="relative h-[60%] sm:h-full sm:w-[50%]">
        <Image
          src={customImage || bannerRightImage}
          placeholder="blur"
          blurDataURL={blurData}
          alt={
            customAlt ||
            "Olga Noszczyk w białym fartuchu medycznym opiera się o stertę książek branżowych ('Skuteczna Stymulacja Tkankowa' tom I i II oraz 'Iniekcje Estetyczne Twarzy') stojąc na tle bujnych liści monstery, obok bukietu różowych kwiatów"
          }
          fill
          className="rounded-br-big rounded-bl-big sm:rounded-tr-big object-cover object-top sm:rounded-bl-none"
          priority
          sizes="(max-width: 640px) 100vw, (min-width: 641px) min(50vw, 650px)"
        />
      </div>
    </div>
  );
}
