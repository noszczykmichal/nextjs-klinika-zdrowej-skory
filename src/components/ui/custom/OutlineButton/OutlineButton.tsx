import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import Link from "next/link";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  footnote?: boolean;
}

export default function OutlineButton({
  children,
  type = "button",
  footnote = false,
  className,
  ...props
}: OutlineButtonProps) {
  return (
    <div className="flex flex-col">
      <button
        type={type}
        className={clsx(
          "border-magenta-100 hover:bg-magenta-100 active:bg-magenta-100 rounded-small self-start border px-6 py-2 transition-all duration-150 hover:cursor-pointer hover:text-white",
          className,
          { "w-1/2": footnote === true },
        )}
        {...props}
      >
        {children}
      </button>
      {footnote && (
        <span className="text-white-100/50 mt-2 w-1/2 text-center text-[10px] leading-4">
          Wysyłając formularz akceptujesz{" "}
          <Link
            href="/polityka-prywatnosci"
            className="hover:text-white-100 underline transition-all duration-150"
          >
            politykę prywatności
          </Link>
          .
        </span>
      )}
    </div>
  );
}
