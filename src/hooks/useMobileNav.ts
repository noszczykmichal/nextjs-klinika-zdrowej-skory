import { useContext } from "react";

import UIContext from "@/store/uiContext";

function useMobileNav() {
  const { isMenuOpen, menuToggleHandler } = useContext(UIContext);
  const onClickHandler = () => {
    const body = document.body;
    body.classList.toggle("overflow-hidden");
    menuToggleHandler();
  };

  return { isMenuOpen, onClickHandler };
}

export default useMobileNav;
