"use client";

import { useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import UIContext from "@/store/uiContext";
import { NavigationItems } from "../NavigationItems/NavigationItems";
// import useMobileNav from "@/hooks/useMobileNav";
import { ListItemData } from "@/types/types";

interface SideNavProps {
  onBackdropClick: () => void;
  navData: Partial<ListItemData>[];
}

function SideNav({ onBackdropClick, navData }: SideNavProps) {
  const { isMenuOpen, closeSideNavHandler } = useContext(UIContext);
  const nodeRef = useRef<HTMLElement | null>(null);
  // const { onClickHandler } = useMobileNav();

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
          ref={nodeRef}
        >
          <nav className="flex-start flex h-1/2 w-full flex-col items-center">
            <NavigationItems
              // className="flex h-[50%] w-[50%] flex-col justify-around"
              // onClick={onClickHandler}
              navData={navData}
              // classForDropDown="top-[30%] left-[-50%] text-[16px] xxs:text-[18px] "
            />
          </nav>
        </aside>
      </CSSTransition>
    </>
  );
}

export default SideNav;
