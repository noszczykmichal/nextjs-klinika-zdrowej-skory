"use client";

import { createPortal } from "react-dom";
import { useEffect, useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import UIContext from "@/store/uiContext";
import NavigationItems from "../NavigationItems/NavigationItems";

function SideNav() {
  const { menuOpen: isMenuOpen, closeSideNavHandler } = useContext(UIContext);
  const closeSideNavRef = useRef(closeSideNavHandler);
  const nodeRef = useRef<HTMLElement | null>(null);

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
          <Backdrop />,
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
          className="fixed top-0 right-0 bg-white h-[100vh] w-[70vw] z-[12] shadow-[var(--custom-box-shadow)]"
          ref={nodeRef}
        >
          <nav className="mt-[150px]">
            <NavigationItems className="" />
          </nav>
        </aside>
      </CSSTransition>
    </>
  );
}

export default SideNav;
