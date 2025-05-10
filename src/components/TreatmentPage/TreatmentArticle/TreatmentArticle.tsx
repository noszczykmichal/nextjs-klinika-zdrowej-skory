"use client";

import dynamic from "next/dynamic";

import { TreatmentDetails } from "@/types/types";

const TreatmentArticleContent = dynamic(
  () =>
    import(
      "@/components/TreatmentPage/TreatmentArticle/TreatmentArticleContent/TreatmentArticleContent"
    ),
  { ssr: false }
);

export default function TreatmentArticle({
  description: treatmentDescription,
}: Partial<TreatmentDetails>) {
  return <TreatmentArticleContent description={treatmentDescription} />;
}
