"use client";

import { useEffect, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";

import Backdrop from "@/components/Layout/Navigation/SideNav/Backdrop/Backdrop";
import UIContext from "@/store/uiContext";
// import NavigationItems from "../NavigationItems/NavigationItems";
// import useMobileNav from "@/hooks/useMobileNav";
import { ListItemData } from "@/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SideNavProps {
  onBackdropClick: () => void;
  navData: Partial<ListItemData>[];
}

function SideNav({ onBackdropClick }: SideNavProps) {
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
            {/* <NavigationItems
              className="flex h-[50%] w-[50%] flex-col justify-around"
              onClick={onClickHandler}
              navData={navData}
              classForDropDown="top-[30%] left-[-50%] text-[16px] xxs:text-[18px] "
            /> */}

            <Accordion type="multiple" className="top-0 left-0 w-1/2">
              <AccordionItem value="about">
                <Link href="/0-nas" className="block py-1 pl-4 text-sm">
                  O nas
                </Link>
              </AccordionItem>

              <AccordionItem value="treatments">
                <AccordionTrigger>Zabiegi</AccordionTrigger>
                <AccordionContent>
                  <Link
                    href="/zabiegi/skora"
                    className="block py-1 pl-4 text-sm"
                  >
                    Na twarz
                  </Link>
                  <Link
                    href="/zabiegi/cialo"
                    className="block py-1 pl-4 text-sm"
                  >
                    Na ciało
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="blog">
                <AccordionTrigger>Blog</AccordionTrigger>
                <AccordionContent>
                  <Link href="/blog" className="block py-1 pl-4 text-sm">
                    Wszystkie wpisy
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>Kontakt</AccordionTrigger>
                <AccordionContent>
                  <Link href="/kontakt" className="block py-1 pl-4 text-sm">
                    Formularz
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </aside>
      </CSSTransition>
    </>
  );
}

export default SideNav;
