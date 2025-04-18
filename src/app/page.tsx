import { BreadcrumbHome } from "@/components/HomePage/BreadcrumbHome/BreadcrumbHome";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import { ResponsiveCarousel } from "@/components/HomePage/ResponsiveCarousel/ResponsiveCarousel";

export default function HomePage() {
  return (
    <>
      <BreadcrumbHome className="breadcrumb-wrapper flex justify-start w-full max-w-[1300px] py-[20px] mx-auto" />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="flex flex-col gap-y-[50px] pb-[50px] max-w-[1300px]">
          <MainBanner headerText="Kosmetologia na światowym poziomie" />
          <article>
            <div className="flex flex-col lg:flex-row gap-x-[50px]">
              <h2
                style={{
                  fontSize: "var(--font-size-heading)",
                }}
                className="lg:w-[50%] font-extralight text-center lg:text-left"
              >
                Zabiegi szyte na miarę potrzeb Twojej skóry
              </h2>
              <div className="lg:w-[50%] text-[17px] text-justify pt-[26px] lg:pt-0">
                <p className="pb-[26px]">
                  W naszym gabinecie realizujemy zabiegi szyte na miarę potrzeb
                  Twojej skóry. Zespół wybitnych specjalistów w zakresie
                  medycyny estetycznej oraz kosmetologii połączył siły, by w
                  sercu Gocławia w Warszawie stworzyć wyjątkowe miejsce dla
                  najbardziej wymagających klientów.
                </p>
                <p>
                  Dzięki wieloletniemu doświadczeniu naszych lekarzy i
                  kosmetologów tworzymy terapie dostosowane do wieku, problemu
                  oraz oczekiwań klienta. W zabiegach wykorzystujemy najnowsze
                  osiągnięcia medycyny i kosmetologii, nie zapominając przy tym
                  o podstawach, jakimi są bezpieczeństwo oraz skuteczność
                  podjętych terapii skóry.
                </p>
              </div>
            </div>
          </article>
          <ResponsiveCarousel />
        </section>
      </main>
    </>
  );
}
