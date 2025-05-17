import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface StyledButtonProps {
  href: string;
  children: ReactNode;
}

export default function StyledButton({ href, children }: StyledButtonProps) {
  return (
    <Link href={href} className="inline-flex w-fit">
      <Button className="px-1 xxs:px-6 bg-transparent border-1 border-[var(--magenta-100)] text-[var(--magenta-100)] rounded-[var(--medium-border-radius)] rounded-bl-none rounded-tr-none before:content-[''] before:w-[5px] xs:before:w-[14px] before:bg-[var(--magenta-100)] before:h-[1px] hover:text-white hover:bg-[var(--magenta-100)] hover:before:bg-white hover:cursor-pointer transition-all duration-75">
        {children}
      </Button>
    </Link>
  );
}
