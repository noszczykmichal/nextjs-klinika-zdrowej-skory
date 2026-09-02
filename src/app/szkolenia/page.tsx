import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";

import blogPhoto from "@/assets/blog.jpg";
import { getAllResources } from "@/utils/sanityPageData";

export default async function AllTrainingsPage() {
  const allTrainings = await getAllResources("training");

  const routesData = [{ routeName: "Szkolenia" }];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <MainBanner
        headerText="Wszystkie Szkolenia"
        customImage={blogPhoto}
        customAlt="Olga Noszczyk uśmiechnięta, ubrana w czarną, błyszczącą stylizację, pozuje na tle zielonej rośliny w jasnym wnętrzu."
      />
      <ItemsList listItemsData={allTrainings} />
    </LayoutWrapper>
  );
}
