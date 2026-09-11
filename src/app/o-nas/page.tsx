import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import oNas from "@/assets/o-nas.jpg";
import HeroArticle from "@/components/HomePage/HeroArticle/HeroArticle";
import { aboutUsArticleContent } from "@/utils/config";

export default function AboutUs() {
  const routesData = [{ routeName: "O Nas" }];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <MainBanner
        headerText="O Nas"
        customImage={oNas}
        customAlt="Olga Noszczyk w białym fartuchu medycznym z czarnymi guzikami uśmiecha się, opierając podbródek na dłoni, na jednolitym jasnym tle."
      />
      <HeroArticle
        headerText="Olga Noszczyk - Ekspert któremu możesz zaufać"
        articleContent={aboutUsArticleContent}
      />
    </LayoutWrapper>
  );
}
