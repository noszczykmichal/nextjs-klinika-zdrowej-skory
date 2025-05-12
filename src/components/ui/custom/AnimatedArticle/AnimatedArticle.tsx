"use client";

import dynamic from "next/dynamic";

import { TreatmentDetails } from "@/types/types";

const TreatmentArticleContent = dynamic(
  () =>
    import(
      "@/components/ui/custom/AnimatedArticle/AnimatedArticleContent/AnimatedArticleContent"
    ),
  { ssr: false }
);

export default function AnimatedArticle({
  description: treatmentDescription,
}: Partial<TreatmentDetails>) {
  return <TreatmentArticleContent description={treatmentDescription} />;
}
