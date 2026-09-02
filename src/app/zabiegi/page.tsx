import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import icoone from "@/assets/icoone.jpg";
import { getAllResources } from "@/utils/sanityPageData";

export default async function AllTreatmentsPage() {
  const allTreatments = await getAllResources("treatment");

  const routesData = [{ routeName: "Zabiegi" }];

  return (
    <LayoutWrapper breadcrumbData={routesData}>
      <MainBanner
        headerText="Wszystkie zabiegi"
        customImage={icoone}
        customAlt="Zabieg antycellulitowy urządzeniem Icoone wykonywany na udach pacjentki."
      />
      <ItemsList listItemsData={allTreatments} />
    </LayoutWrapper>
  );
}
