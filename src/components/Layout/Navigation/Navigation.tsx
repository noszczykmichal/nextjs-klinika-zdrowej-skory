"use client";

import { useState, useEffect, useMemo } from "react";
import { Smartphone } from "lucide-react";

import { UIContextProvider } from "@/store/uiContext";
// import NavigationItems from "./NavigationItems/NavigationItems";
import { NavigationMenuDemo } from "./NavigationMenuDemo/NavigationMenuDemo";
import Hamburger from "./Hamburger/Hamburger";
import SideNav from "./SideNav/SideNav";
import useScrollDirection from "@/hooks/useScrollDirection";
import useHandleScroll from "@/hooks/useHandleScroll";
import Logo from "../Icon/Icons/Logo";
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
    []
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

  const hamburgerClickHandler = () => {
    setAttachedClasses([headerClasses.toolbar]);
  };

  const backdropClickHandler = () => {
    setAttachedClasses([headerClasses.toolbar, headerClasses.toolbarBoxShadow]);
  };

  return (
    <UIContextProvider>
      <header className={`px-[10px] md:px-[42px] ${attachedClasses.join(" ")}`}>
        <nav className="w-full max-w-[1300px] mx-auto py-[20px] flex justify-between">
          <Logo
            className="w-full h-[40px] fill-[var(--gray-100)]"
            id="header-logo"
          />
          <NavigationMenuDemo navData={navData} />
          <div className="ml-[10px] flex items-center justify-between lg:justify-end flex-grow-[0.5] max-w-[250px]">
            <a
              href="tel:+48508832553"
              className="flex items-center text-nowrap py-2 px-4 font-extralight text-[15px] bg-[var(--gray-25)] rounded-[var(--big-border-radius)] mr-2"
            >
              <Smartphone className="stroke-1" /> Umów wizytę
            </a>
            <Hamburger onClick={hamburgerClickHandler} />
          </div>
          <SideNav onBackdropClick={backdropClickHandler} />
        </nav>
      </header>
    </UIContextProvider>
  );
}
