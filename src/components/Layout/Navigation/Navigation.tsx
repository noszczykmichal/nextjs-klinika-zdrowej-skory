"use client";

import { useState, useEffect } from "react";
import { Smartphone } from "lucide-react";

import { UIContextProvider } from "@/store/uiContext";
import Icon from "@/components/Layout/Icon/Icon";
import NavigationItems from "./NavigationItems/NavigationItems";
import Hamburger from "./Hamburger/Hamburger";
import SideNav from "./SideNav/SideNav";
import useScrollDirection from "@/hooks/useScrollDirection";
import useHandleScroll from "@/hooks/useHandleScroll";

function Navigation() {
  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const [attachedClasses, setAttachedClasses] = useState("");
  const isTop = useHandleScroll();

  useEffect(() => {
    if (!isTop && scrollDirection === "up") {
      setAttachedClasses(
        "bg-[var(--white-100)] shadow-[var(--navigation-box-shadow)] backdrop-blur-sm"
      );
    } else if (!isTop && scrollDirection === "down") {
      setAttachedClasses(
        "transform -translate-y-full shadow-[var(--navigation-box-shadow)]"
      );
    }
  }, [scrollDirection, isTop]);

  return (
    <UIContextProvider>
      <header
        className={`w-full flex items-center z-[10] fixed top-0 left-0 transition-all duration-[0.25s] ease-[var(--transition-navigation)] text-lg ${attachedClasses}`}
      >
        <nav className="w-full max-w-[1300px] mx-auto px-[10px] md:px-[42px] py-[20px] flex justify-between">
          <Icon name="logo" href="/" className="h-[40px]" id="header-logo" />
          <NavigationItems className="hidden lg:flex h-full" />
          <div className="ml-[10px] flex items-center justify-between lg:justify-end flex-grow-[0.5] max-w-[250px]">
            <a
              href="tel:+48508832553"
              className="flex items-center text-nowrap py-2 px-4 font-extralight text-[15px] bg-[var(--gray-75)] rounded-[var(--big-border-radius)] mr-2"
            >
              <Smartphone className="stroke-1" /> Umów wizytę
            </a>
            <Hamburger />
          </div>
          <SideNav />
        </nav>
      </header>
    </UIContextProvider>
  );
}

export default Navigation;
