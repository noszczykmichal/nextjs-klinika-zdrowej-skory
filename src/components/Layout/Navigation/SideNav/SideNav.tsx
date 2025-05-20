"use client";

import { useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import UIContext from "@/store/uiContext";
import NavigationItems from "../NavigationItems/NavigationItems";
import useMobileNav from "@/hooks/useMobileNav";
import { ListItemData } from "@/types/types";

interface SideNavProps {
  onBackdropClick: () => void;
  navData: Partial<ListItemData>[];
}

function SideNav({ onBackdropClick, navData }: SideNavProps) {
  const { isMenuOpen, closeSideNavHandler } = useContext(UIContext);
  const closeSideNavRef = useRef(closeSideNavHandler);
  const nodeRef = useRef<HTMLElement | null>(null);
  const { onClickHandler } = useMobileNav();

  useEffect(() => {
    const onResize = (e: UIEvent) => {
      if ((e.currentTarget as Window).innerWidth > 768) {
        document.body.classList.remove("blur");
        closeSideNavRef.current();
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <>
      {isMenuOpen &&
        createPortal(
          <Backdrop onClick={onBackdropClick} />,
          document.getElementById("overlay-root") as HTMLDivElement
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
          className="w-[60vw] sm:w-[40vw] h-[100vh] fixed top-0 right-0 flex flex-col justify-center bg-white z-[12] shadow-[var(--custom-box-shadow)]"
          ref={nodeRef}
        >
          <nav className="h-full flex flex-col justify-center">
            <NavigationItems
              className="h-[50%] flex flex-col justify-around items-center"
              onClick={onClickHandler}
              navData={navData}
              variant="dark"
            />
          </nav>
        </aside>
      </CSSTransition>
    </>
  );
}

export default SideNav;
