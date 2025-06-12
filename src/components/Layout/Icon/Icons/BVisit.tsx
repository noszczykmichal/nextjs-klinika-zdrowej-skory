import Image from "next/image";

import bVisitIcon from "@/assets/bvisit_logo_white.png";

interface BVisitProps {
  className?: string;
}

export default function BVisit({ className }: BVisitProps) {
  return (
    <Image src={bVisitIcon} className={className} alt="the bvisit icon." />
  );
}
