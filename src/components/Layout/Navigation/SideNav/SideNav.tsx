"use client";

import { useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import UIContext from "@/store/uiContext";
import NavigationItems from "../NavigationItems/NavigationItems";
import {
  useMobileNav as _useMobileNav,
  UseMobileNavType,
} from "@/hooks/useMobileNav";
import { ListItemData } from "@/types/types";

interface SideNavProps {
  onBackdropClick: () => void;
  navData: Partial<ListItemData>[];
  useMobileNav?: UseMobileNavType;
}

export default function SideNav({
  onBackdropClick,
  navData,
  useMobileNav = _useMobileNav,
}: SideNavProps) {
  const { isMenuOpen, closeSideNavHandler } = useContext(UIContext);
  const nodeRef = useRef<HTMLElement | null>(null);
  const { onClickHandler } = useMobileNav();

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if ((e.currentTarget as Window).innerWidth >= 1024) {
        const body = document.body;
        closeSideNavHandler();

        if (body.classList.contains("overflow-hidden")) {
          body.classList.remove("overflow-hidden");
        }
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [closeSideNavHandler]);
  return (
    <>
      {isMenuOpen &&
        createPortal(
          <Backdrop onClick={onBackdropClick} />,
          document.getElementById("overlay-root") as HTMLDivElement,
        )}

      <CSSTransition
        in={isMenuOpen}
        timeout={300}
        classNames="sideNav"
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        <aside
          className="xs:w-[60vw] fixed top-0 right-0 z-[12] flex h-[100vh] w-[80vw] flex-col justify-center bg-white shadow-[var(--custom-box-shadow)] sm:w-[50vw]"
          aria-label="Main mobile navigation"
          aria-hidden={!isMenuOpen}
          ref={nodeRef}
        >
          <NavigationItems
            navWrapperClasses="flex-start flex h-full w-full flex-col items-center max-w-none [&>div]:h-1/2 [&>div]:w-full [&>div]:flex [&>div]:flex-col [&>div]:gap-[40px]"
            listClasses="flex flex-col h-full p-4 justify-start items-start gap-[40px]"
            navData={navData}
            isMobileNav
            onClick={onClickHandler}
          />
        </aside>
      </CSSTransition>
    </>
  );
}
