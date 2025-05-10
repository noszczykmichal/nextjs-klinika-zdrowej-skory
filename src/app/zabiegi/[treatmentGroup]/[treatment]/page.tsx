import { client } from "@/sanity/client";

import { TreatmentDetails } from "@/types/types";
import TreatmentPageBanner from "@/components/TreatmentPage/TreatmentPageBanner/TreatmentPageBanner";
import TreatmentGroupsMenu from "@/components/TreatmentPage/TreatmentGroupsMenu/TreatmentGroupsMenu";
import { TreatmentPageBreadcrumb } from "@/components/TreatmentPage/TreatmentPageBreadcrumb/TreatmentPageBreadcrumb";
import TreatmentArticle from "@/components/TreatmentPage/TreatmentArticle/TreatmentArticle";

const TREATMENT_QUERY = `*[_type == "treatment" && treatmentSlug.current == $treatment][0]{
  mainImage,
  title,
  summary,
  altForMainImage,
  treatmentGroup->{title, groupSlug},
  description[]{
    ...,
    _type == "image" => {
      ...,
      alt,
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      }
    }
  }
}`;

const options = { next: { revalidate: 30 } };

export default async function TreatmentPage({
  params,
}: {
  params: Promise<{ treatmentGroup: string; treatment: string }>;
}) {
  const treatment = await client.fetch<TreatmentDetails>(
    TREATMENT_QUERY,
    await params,
    options
  );

  const { title: treatmentName, treatmentGroup, description } = treatment;
  const breadcrumbParams = { treatmentName, treatmentGroup };
  return (
    <>
      <TreatmentPageBreadcrumb
        params={breadcrumbParams}
        className="breadcrumb-wrapper flex justify-start w-full max-w-[1300px] py-[20px] mx-auto"
      />
      <main className="w-full flex justify-center px-[25px] md:px-[42px] mx-auto">
        <section className="w-full flex flex-col gap-y-[70px] lg:gap-y-[100px] pb-[70px] lg:pb-[100px] max-w-[1300px]">
          <TreatmentPageBanner treatmentDetails={treatment} />
          <div className="grid grid-cols-1 sm:grid-cols-[4fr__6fr] gap-[20px] md:gap-[40px] lg:gap-[60px] xl:gap-[90px] max-w-[1300px]">
            <TreatmentGroupsMenu className="order-2 sm:order-1" />
            <TreatmentArticle description={description} />
          </div>
        </section>
      </main>
    </>
  );
}
