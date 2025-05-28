import { client } from "@/sanity/client";

import LayoutWrapper from "@/components/Layout/LayoutWrapper/LayoutWrapper";
import MainBanner from "@/components/HomePage/MainBanner/MainBanner";
import ItemsList from "@/components/ui/custom/ItemsList/ItemsList";
import { ListItemData } from "@/types/types";
import icoone from "@/assets/icoone.jpg";

const ALL_TREATMENTS_QUERY = `*[_type == "treatment"]{_id, altForMainImage, "category": treatmentGroup->{title, "categorySlug": groupSlug}, mainImage, "slug": treatmentSlug, summary, title}`;

const options = { next: { revalidate: 30 } };

export default async function AllTreatmentsPage() {
  const allTreatments = await client.fetch<ListItemData[]>(
    ALL_TREATMENTS_QUERY,
    {},
    options
  );

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
