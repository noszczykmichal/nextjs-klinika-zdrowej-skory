"use client";

import { FC, createContext, useState, useMemo, ReactNode } from "react";

const UIContext = createContext({
  isMenuOpen: false,
  menuToggleHandler: () => {},
  closeSideNavHandler: () => {},
});

interface UIContextProviderProps {
  children: ReactNode;
}

export const UIContextProvider: FC<UIContextProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggleHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeSideNavHandler = () => {
    setIsMenuOpen(false);
  };

  const context = useMemo(
    () => ({
      isMenuOpen,
      menuToggleHandler,
      closeSideNavHandler,
    }),
    [isMenuOpen]
  );

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIContext;
