import { useContext } from "react";

import UIContext from "@/store/uiContext";

function useMobileNav() {
  const { isMenuOpen, menuToggleHandler } = useContext(UIContext);
  /// do posprzątania- to jest totalnie bez sensu!! wszytsko może być w backdropie
  const onClickHandler = () => {
    const body = document.body;
    // const main = document.querySelector("main") as HTMLElement;
    // const footer = document.querySelector("footer") as HTMLElement;
    // const headerLogo = document.getElementById("header-logo") as HTMLElement;
    body.classList.toggle("overflow-hidden");
    // headerLogo.classList.toggle("blur");
    // main.classList.toggle("blur");
    // footer.classList.toggle("blur");
    menuToggleHandler();
  };

  return { isMenuOpen, onClickHandler };
}

export default useMobileNav;
