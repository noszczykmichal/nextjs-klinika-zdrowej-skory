"use client";

import { createPortal } from "react-dom";
import { useEffect, useContext, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import UIContext from "@/store/uiContext";
import { linksConfig } from "@/utils/config";

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
          className="fixed top-0 right-0 bg-white h-[100vh] w-[50vw] z-[12]"
          ref={nodeRef}
        >
          <nav>
            <ul className="hidden lg:flex">
              {linksConfig.map((link) => (
                <li key={link.id} className="px-[20px]">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </CSSTransition>
    </>
  );
}

export default SideNav;
