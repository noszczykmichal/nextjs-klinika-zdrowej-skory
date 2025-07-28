import { useContext, useCallback } from "react";

import UIContext from "@/store/uiContext";

export type UseMobileNavType = typeof useMobileNav;

export function useMobileNav() {
  const { isMenuOpen, menuToggleHandler } = useContext(UIContext);
  const onClickHandler = useCallback(() => {
    const body = document.body;
    body.classList.toggle("overflow-hidden");
    menuToggleHandler();
  }, [menuToggleHandler]);

  return { isMenuOpen, onClickHandler };
}
