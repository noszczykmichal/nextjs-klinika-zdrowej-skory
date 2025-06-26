"use client";

import {
  FC,
  createContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

import { NavId } from "@/types/types";

const UIContext = createContext({
  isMenuOpen: false,
  idActiveLink: "",
  menuToggleHandler: () => {},
  closeSideNavHandler: () => {},
  setIdActiveLink: (_id: NavId) => {},
});

interface UIContextProviderProps {
  children: ReactNode;
}

export const UIContextProvider: FC<UIContextProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [idActiveLink, setIdActiveLink] = useState("");

  const menuToggleHandler = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const closeSideNavHandler = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const context = useMemo(
    () => ({
      isMenuOpen,
      idActiveLink,
      menuToggleHandler,
      closeSideNavHandler,
      setIdActiveLink,
    }),
    [isMenuOpen, menuToggleHandler, closeSideNavHandler, idActiveLink],
  );

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIContext;
