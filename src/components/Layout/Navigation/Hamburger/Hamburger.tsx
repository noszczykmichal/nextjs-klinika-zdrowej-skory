"use client";

import useMobileNav from "@/hooks/useMobileNav";
import "@/styles/globals.css";

interface HamburgerProps {
  onClick: () => void;
}

function Hamburger({ onClick }: HamburgerProps) {
  const { isMenuOpen, onClickHandler } = useMobileNav();

  let boxInnerClasses = "box__inner box__inner--side-nav-closed";

  if (isMenuOpen) {
    boxInnerClasses = "box__inner box__inner--side-nav-open";
  }

  const onButtonClick = () => {
    onClick();
    onClickHandler();
  };

  return (
    <button
      type="button"
      className={
        "z-[15] cursor-pointer transition-all duration-[0.15s] ease-linear lg:hidden"
      }
      onClick={onButtonClick}
    >
      <div className="relative inline-block h-[24px] w-[var(--hamburger-width)]">
        <div
          className={`absolute top-[50%] right-0 h-[2px] w-[var(--hamburger-width)] rounded-[var(--small-border-radius)] bg-[var(--gray-100)] transition-transform duration-[0.22s] ${boxInnerClasses}`}
        />
      </div>
    </button>
  );
}

export default Hamburger;
