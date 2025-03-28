"use client";

import useMobileNav from "@/hooks/useMobileNav";
import "@/styles/globals.css";

function Hamburger() {
  const { isMenuOpen, onClickHandler } = useMobileNav();

  let boxInnerClasses = "box__inner box__inner--side-nav-closed";

  if (isMenuOpen) {
    boxInnerClasses = "box__inner box__inner--side-nav-open";
  }

  return (
    <button
      type="button"
      className={
        "lg:hidden z-[15] cursor-pointer ease-linear duration-[0.15s] transition-all"
      }
      onClick={onClickHandler}
    >
      <div className="relative inline-block w-[var(--hamburger-width)] h-[24px]">
        <div
          className={`absolute top-[50%] right-0 w-[var(--hamburger-width)] h-[2px] rounded-[var(--small-border-radius)] bg-[var(--gray-100)] duration-[0.22s] transition-transform ${boxInnerClasses}`}
        />
      </div>
    </button>
  );
}

export default Hamburger;
