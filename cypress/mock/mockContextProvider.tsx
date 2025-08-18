import UIContext, { UIContextValueInterface } from "@/store/uiContext";
import { ReactNode } from "react";

const providerDefaultValue = {
  isMenuOpen: false,
  menuToggleHandler: () => {},
  closeSideNavHandler: () => {},
};

interface MockProviderProps {
  children: ReactNode;
  value?: UIContextValueInterface;
}

export default function MockProvider({
  children,
  value = providerDefaultValue,
}: MockProviderProps) {
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
