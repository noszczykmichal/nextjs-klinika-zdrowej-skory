import Image from "next/image";

import pkBannerLeft from "@/assets/pk-banner-left.jpg";
import pkBannerRight from "@/assets/pk-banner-right.jpg";

export default function Home() {
  return (
    <section className="max-w-[1300px] mx-auto grid gap-y-[100px]">
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
      <article>
        <div className="flex gap-x-[50px]">
          <h3
            style={{
              fontSize: "var(--font-size-heading)",
            }}
            className="w-[50%] font-extralight"
          >
            Zabiegi szyte na miarę potrzeb Twojej skóry
          </h3>
          <div className="w-[50%] text-[17px]">
            <p className="pb-[26px]">
              W naszym gabinecie realizujemy zabiegi szyte na miarę potrzeb
              Twojej skóry. Zespół wybitnych specjalistów w zakresie medycyny
              estetycznej oraz kosmetologii połączył siły, by w sercu Gocławia w
              Warszawie stworzyć wyjątkowe miejsce dla najbardziej wymagających
              klientów.
            </p>
            <p>
              Dzięki wieloletniemu doświadczeniu naszych lekarzy i kosmetologów
              tworzymy terapie dostosowane do wieku, problemu oraz oczekiwań
              klienta. W zabiegach wykorzystujemy najnowsze osiągnięcia medycyny
              i kosmetologii, nie zapominając przy tym o podstawach, jakimi są
              bezpieczeństwo oraz skuteczność podjętych terapii skóry.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
