import Link from "next/link";

import ONLogo from "@/assets/icons/on-logo.svg";

interface LogoProps {
  id?: string;
  className: string;
}

export default function Logo({ id, className }: LogoProps) {
  return (
    <Link href="/" id={id} aria-label="Przejdź do strony głównej">
      <ONLogo className={className} />
    </Link>
  );
}
