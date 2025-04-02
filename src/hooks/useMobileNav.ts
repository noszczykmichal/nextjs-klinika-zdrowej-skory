import { useContext } from "react";

import UIContext from "@/store/uiContext";

function useMobileNav() {
  const { isMenuOpen, menuToggleHandler } = useContext(UIContext);

  const onClickHandler = () => {
    const body = document.body;
    const main = document.querySelector("main") as HTMLElement;
    const headerLogo = document.getElementById("header-logo") as HTMLElement;
    body.classList.toggle("overflow-hidden");
    headerLogo.classList.toggle("blur");
    main.classList.toggle("blur");
    menuToggleHandler();
  };

  return { isMenuOpen, onClickHandler };
}

export default useMobileNav;
