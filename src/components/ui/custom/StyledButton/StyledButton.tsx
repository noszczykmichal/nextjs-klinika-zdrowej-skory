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
        className={`xs:before:w-3.5 border-magenta-100 text-magenta-100 before:bg-magenta-100 hover:bg-magenta-100 active:bg-magenta-100 flex h-full w-full items-center justify-center rounded-[var(--medium-border-radius)] rounded-tr-none rounded-bl-none border bg-transparent transition-all duration-150 before:mr-2.5 before:h-[1px] before:w-[10px] before:transition-all before:duration-150 before:content-[''] hover:cursor-pointer hover:text-white hover:before:bg-white active:text-white active:before:bg-white ${contentClasses}`}
      >
        {children}
      </span>
    </Link>
  );
}
