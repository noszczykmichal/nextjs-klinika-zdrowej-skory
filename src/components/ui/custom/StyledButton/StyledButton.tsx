import Link from "next/link";
import { ReactNode } from "react";

interface StyledButtonProps {
  children: ReactNode;
  href: string;
  ariaLabel?: string;
  wrapperClasses?: string;
  contentClasses?: string;
}

export default function StyledButton({
  children,
  href,
  ariaLabel,
  wrapperClasses = "h-[36px] max-w-[100px]",
  contentClasses,
}: StyledButtonProps) {
  return (
    <Link href={href} aria-label={ariaLabel} className={wrapperClasses}>
      <span
        className={`xs:before:w-[14px] flex h-full w-full items-center justify-center rounded-[var(--medium-border-radius)] rounded-tr-none rounded-bl-none border-1 border-[var(--magenta-100)] bg-transparent text-[var(--magenta-100)] transition-all duration-75 before:mr-[10px] before:h-[1px] before:w-[10px] before:bg-[var(--magenta-100)] before:content-[''] hover:cursor-pointer hover:bg-[var(--magenta-100)] hover:text-white hover:before:bg-white active:bg-[var(--magenta-100)] active:text-white active:before:bg-white ${contentClasses}`}
      >
        {children}
      </span>
    </Link>
  );
}
