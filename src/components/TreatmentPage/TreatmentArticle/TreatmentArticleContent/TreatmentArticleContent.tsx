import { useRef } from "react";
import { PortableText } from "next-sanity";

import { portableTextComponentConfig } from "@/utils/portableTextComponentConfig";
import { TreatmentDetails } from "@/types/types";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function TreatmentArticleContent({
  description: treatmentDescription,
}: Partial<TreatmentDetails>) {
  const revealItem = useRef<HTMLDivElement>(null);
  useScrollReveal(revealItem, 200, 0.1);

  return (
    <article className="sm:order-2" ref={revealItem}>
      {treatmentDescription && (
        <PortableText
          value={treatmentDescription}
          components={portableTextComponentConfig}
        />
      )}
    </article>
  );
}
