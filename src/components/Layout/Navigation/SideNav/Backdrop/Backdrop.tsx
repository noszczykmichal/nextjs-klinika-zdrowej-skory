/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useContext } from "react";

import { useMobileNav } from "@/hooks/useMobileNav";
import UIContext from "@/store/uiContext";

interface BackdropProps {
  onClick: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  const { isMenuOpen } = useContext(UIContext);
  const { onClickHandler: onBackdropClick } = useMobileNav();

  const handler = () => {
    onClick();
    onBackdropClick();
  };

  const attached = isMenuOpen ? "backdrop-blur-md" : "";

  return (
    <div
      className={`xs:w-[40vw] xxs:w-[20vw] fixed inset-0 z-10 h-screen w-0 bg-transparent sm:w-[50vw] ${attached}`}
      onClick={handler}
      data-testid="backdrop"
    />
  );
}
