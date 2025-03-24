import { useContext } from "react";

import UIContext from "@/store/uiContext";

function useMobileNav() {
  const { menuOpen, menuToggleHandler } = useContext(UIContext);

  const onClickHandler = () => {
    const main = document.querySelector("main") as HTMLElement;
    const headerLogo = document.getElementById("header-logo") as HTMLElement;
    headerLogo.classList.toggle("blur");
    main.classList.toggle("blur");
    menuToggleHandler();
  };

  return { menuOpen, onClickHandler };
}

export default useMobileNav;
