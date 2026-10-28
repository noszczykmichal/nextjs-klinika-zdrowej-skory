"use client";

import { useState, useEffect } from "react";
import { Smartphone } from "lucide-react";
import clsx from "clsx";

import { UIContextProvider } from "@/store/uiContext";
import NavigationItems from "@/components/Layout/Navigation/NavigationItems/NavigationItems";
import Hamburger from "@/components/Layout/Navigation/Hamburger/Hamburger";
import SideNav from "@/components/Layout/Navigation/SideNav/SideNav";
import useScrollDirection from "@/hooks/useScrollDirection";
import useHandleScroll from "@/hooks/useHandleScroll";
import Logo from "@/components/Layout/Icon/Icons/Logo";
import { NavigationDataInterface } from "@/types/types";

interface NavigationProps {
  navData: NavigationDataInterface;
}

const headerClasses = {
  toolbar:
    "w-full flex items-center z-[5] fixed top-0 left-0 transition-all duration-[0.25s] ease-[var(--transition-navigation)] text-lg",
  toolbarBoxShadow:
    "bg-[var(--white-100)] shadow-[var(--navigation-box-shadow)] backdrop-blur-sm",
  toolbarHidden:
    "transform -translate-y-full shadow-[var(--navigation-box-shadow)]",
};

export default function Navigation({ navData }: NavigationProps) {
  const scrollDirection = useScrollDirection({ initialDirection: "down" });
  const isTop = useHandleScroll();

  const [forcedVisible, setForcedVisible] = useState(false);
  const scrollKey = `${isTop}-${scrollDirection}`;
  const [prevScrollKey, setPrevScrollKey] = useState(scrollKey);

  if (prevScrollKey !== scrollKey) {
    setPrevScrollKey(scrollKey);
    setForcedVisible(false);
  }

  const showShadow = !isTop && (forcedVisible || scrollDirection === "up");
  const isHidden = !isTop && !forcedVisible && scrollDirection === "down";

  const attachedClasses = clsx(
    headerClasses.toolbar,
    showShadow && headerClasses.toolbarBoxShadow,
    isHidden && headerClasses.toolbarHidden,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "true");
  }, []);

  const clickHandler = () => setForcedVisible(true);

  return (
    <UIContextProvider>
      <header className={clsx("px-2.5 md:px-10.5", attachedClasses)}>
        <div className="mx-auto flex w-full max-w-325 items-center justify-between py-5">
          <Logo className="h-10 w-full fill-(--gray-100)" />
          <NavigationItems
            navData={navData}
            listClasses="hidden h-full gap-0 lg:flex"
          />
          <div className="ml-2.5 flex max-w-62.5 grow-[0.5] items-center justify-between lg:justify-end">
            <a
              href="tel:+48508832553"
              className="mr-2 flex items-center rounded-(--big-border-radius) bg-(--gray-25) px-4 py-2 text-[15px] font-extralight text-nowrap"
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
