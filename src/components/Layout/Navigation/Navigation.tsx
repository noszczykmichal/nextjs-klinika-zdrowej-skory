"use client";

import { useState, useEffect, useMemo } from "react";
import { Smartphone } from "lucide-react";

import { UIContextProvider } from "@/store/uiContext";
import { NavigationItems } from "@/components/Layout/Navigation/NavigationItems/NavigationItems";
import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";
import SideNav from "@/components/Layout/Navigation/SideNav/SideNav";
import useScrollDirection from "@/hooks/useScrollDirection";
import useHandleScroll from "@/hooks/useHandleScroll";
import Logo from "@/components/Layout/Icon/Icons/Logo";
import { ListItemData } from "@/types/types";

interface NavigationProps {
  navData: Partial<ListItemData>[];
}

export default function Navigation({ navData }: NavigationProps) {
  const headerClasses = useMemo(
    () => ({
      toolbar:
        "w-full flex items-center z-[5] fixed top-0 left-0 transition-all duration-[0.25s] ease-[var(--transition-navigation)] text-lg",
      toolbarBoxShadow:
        "bg-[var(--white-100)] shadow-[var(--navigation-box-shadow)] backdrop-blur-sm",
      toolbarHidden:
        "transform -translate-y-full shadow-[var(--navigation-box-shadow)]",
    }),
    [],
  );

  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const [attachedClasses, setAttachedClasses] = useState([
    headerClasses.toolbar,
  ]);
  const isTop = useHandleScroll();

  useEffect(() => {
    const { toolbar, toolbarBoxShadow, toolbarHidden } = headerClasses;
    if (isTop) {
      setAttachedClasses([toolbar]);
    } else if (!isTop && scrollDirection === "up") {
      setAttachedClasses([toolbar, toolbarBoxShadow]);
    } else if (!isTop && scrollDirection === "down") {
      setAttachedClasses([toolbar, toolbarHidden]);
    }
  }, [scrollDirection, isTop, headerClasses]);

  const clickHandler = () => {
    setAttachedClasses([headerClasses.toolbar, headerClasses.toolbarBoxShadow]);
  };

  return (
    <UIContextProvider>
      <header className={`px-[10px] md:px-[42px] ${attachedClasses.join(" ")}`}>
        <div className="mx-auto flex w-full max-w-[1300px] items-center justify-between py-[20px]">
          <Logo
            className="h-[40px] w-full fill-[var(--gray-100)]"
            id="header-logo"
          />
          <NavigationItems
            navData={navData}
            listClasses="hidden h-full gap-0 lg:flex"
          />
          <div className="ml-[10px] flex max-w-[250px] flex-grow-[0.5] items-center justify-between lg:justify-end">
            <a
              href="tel:+48508832553"
              className="mr-2 flex items-center rounded-[var(--big-border-radius)] bg-[var(--gray-25)] px-4 py-2 text-[15px] font-extralight text-nowrap"
            >
              <Smartphone className="stroke-1" /> Umów wizytę
            </a>
            <Hamburger onClick={clickHandler} />
          </div>
          <SideNav onBackdropClick={clickHandler} navData={navData} />
        </div>
      </header>
    </UIContextProvider>
  );
}
