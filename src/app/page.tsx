import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import { ResponsiveCarousel } from "@/components/HomePage/ResponsiveCarousel/ResponsiveCarousel";

export default function Home() {
  return (
    <section className="max-w-[1300px] mx-auto grid gap-y-[100px] pb-[100px]">
      <MainBanner />
      <article>
        <div className="flex gap-x-[50px]">
          <h2
            style={{
              fontSize: "var(--font-size-heading)",
            }}
            className="w-[50%] font-extralight"
          >
            Zabiegi szyte na miarę potrzeb Twojej skóry
          </h2>
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
      <ResponsiveCarousel />
    </section>
  );
}
