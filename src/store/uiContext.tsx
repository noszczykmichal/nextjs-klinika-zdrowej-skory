"use client";

import {
  FC,
  createContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

export interface UIContextValueInterface {
  isMenuOpen: boolean;
  menuToggleHandler: () => void;
  closeSideNavHandler: () => void;
}

const UIContext = createContext<UIContextValueInterface>({
  isMenuOpen: false,
  menuToggleHandler: () => {},
  closeSideNavHandler: () => {},
});

interface UIContextProviderProps {
  children: ReactNode;
}

export const UIContextProvider: FC<UIContextProviderProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuToggleHandler = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const closeSideNavHandler = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const context = useMemo(
    () => ({
      isMenuOpen,
      menuToggleHandler,
      closeSideNavHandler,
    }),
    [isMenuOpen, menuToggleHandler, closeSideNavHandler],
  );

  return <UIContext.Provider value={context}>{children}</UIContext.Provider>;
};

export default UIContext;
