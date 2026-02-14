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
      className={`xs:w-[40vw] fixed inset-0 z-[10] h-[100vh] w-[20vw] bg-transparent sm:w-[50vw] ${attached}`}
      onClick={handler}
      data-testid="backdrop"
    />
  );
}
