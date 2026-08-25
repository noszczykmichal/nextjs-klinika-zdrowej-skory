import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function OutlineButton({
  children,
  type = "button",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={clsx(
        "border-magenta-100 hover:bg-magenta-100 active:bg-magenta-100 rounded-small w-auto self-start border px-6 py-2 transition-all duration-150 hover:cursor-pointer hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
