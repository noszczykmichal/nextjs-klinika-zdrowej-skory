import { client } from "@/sanity/client";

import { BreadcrumbWrapper } from "@/components/ui/custom/BreadcrumbWrapper/BreadcrumbWrapper";
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
    <>
      <BreadcrumbWrapper routesData={routesData} />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <MainBanner
            headerText="Wszystkie zabiegi"
            customImage={icoone}
            customAlt="Zabieg antycellulitowy urządzeniem Icoone wykonywany na udach pacjentki."
          />
          <ItemsList listItemsData={allTreatments} />
        </section>
      </main>
    </>
  );
}
