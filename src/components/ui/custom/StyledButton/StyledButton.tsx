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
      <Button className="xxs:px-6 xs:before:w-[14px] rounded-[var(--medium-border-radius)] rounded-tr-none rounded-bl-none border-1 border-[var(--magenta-100)] bg-transparent px-1 text-[var(--magenta-100)] transition-all duration-75 before:h-[1px] before:w-[5px] before:bg-[var(--magenta-100)] before:content-[''] hover:cursor-pointer hover:bg-[var(--magenta-100)] hover:text-white hover:before:bg-white">
        {children}
      </Button>
    </Link>
  );
}
