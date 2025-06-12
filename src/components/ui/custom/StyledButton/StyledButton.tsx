import Link from "next/link";
import { ReactNode } from "react";

interface StyledButtonProps {
  children: ReactNode;
  href: string;
  ariaLabel?: string;
}

export default function StyledButton({
  children,
  href,
  ariaLabel,
}: StyledButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="h-[36px] max-w-[120px] flex-grow-0 basis-auto"
    >
      <span className="xs:before:w-[14px] relative flex h-full w-full items-center justify-center rounded-[var(--medium-border-radius)] rounded-tr-none rounded-bl-none border-1 border-[var(--magenta-100)] bg-transparent text-[var(--magenta-100)] transition-all duration-75 before:absolute before:top-1/2 before:left-[10%] before:h-[1px] before:w-[10px] before:translate-y-[-50%] before:bg-[var(--magenta-100)] before:content-[''] hover:cursor-pointer hover:bg-[var(--magenta-100)] hover:text-white hover:before:bg-white active:bg-[var(--magenta-100)] active:text-white active:before:bg-white">
        {children}
      </span>
    </Link>
  );
}
