import Link from "next/link";

import ONLogo from "@/assets/icons/on-logo.svg";

interface LogoProps {
  className: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" aria-label="Przejdź do strony głównej">
      <ONLogo className={className} />
    </Link>
  );
}
