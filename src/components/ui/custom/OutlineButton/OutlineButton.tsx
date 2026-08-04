import { ButtonHTMLAttributes } from "react";

export default function OutlineButton({
  children,
  type = "button",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`w-auto self-start rounded-[var(--small-border-radius)] border border-[var(--magenta-100)] px-6 py-2 transition-all hover:cursor-pointer hover:bg-[var(--magenta-100)] hover:text-white hover:duration-150 active:bg-[var(--magenta-100)] ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
