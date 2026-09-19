import { notFound } from "next/navigation";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import oNas from "@/assets/o-nas.jpg";
import AnimatedArticle from "@/components/ui/custom/AnimatedArticle/AnimatedArticle";
import { getPrivacyPolicyPageData } from "@/utils/sanityPageData";

export default async function PrivacyPolicy() {
  const pageData = await getPrivacyPolicyPageData();

  if (!pageData) {
    return notFound();
  }

  const { policyContent } = pageData;

  const routesData = [{ routeName: "Polityka prywatności" }];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <MainBanner
        headerText="Polityka prywatności"
        customImage={oNas}
        customAlt="Olga Noszczyk w białym fartuchu medycznym z czarnymi guzikami uśmiecha się, opierając podbródek na dłoni, na jednolitym jasnym tle."
      />
      <AnimatedArticle articleContent={policyContent} />
    </LayoutWrapper>
  );
}
