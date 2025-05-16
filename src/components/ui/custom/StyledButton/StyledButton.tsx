import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface StyledButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function StyledButton({
  href,
  children,
  className,
}: StyledButtonProps) {
  return (
    <Link href={href} className="inline-flex w-fit">
      <Button
        className={`px-1 xxs:px-6 bg-transparent border-1 border-[var(--black-100)] text-[var(--black-100)] rounded-[var(--medium-border-radius)] rounded-bl-none rounded-tr-none before:content-[''] before:w-[5px] xs:before:w-[14px] before:bg-[var(--black-100)] before:h-[1px] hover:text-white hover:before:bg-white hover:cursor-pointer transition-all duration-75 ${className}`}
      >
        {children}
      </Button>
    </Link>
  );
}
