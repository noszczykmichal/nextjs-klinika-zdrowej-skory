import BVisitLogo from "@/assets/icons/bvisit-logo.svg";

interface BVisitProps {
  className?: string;
}

export default function BVisit({ className }: BVisitProps) {
  return <BVisitLogo className={className} />;
}
