"use client";

import { useState, useRef } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useMobileNav from "@/hooks/useMobileNav";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import "@/styles/globals.css";

function Hamburger() {
  const { menuOpen, onClickHandler } = useMobileNav();
  const [isMounted, setIsMounted] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  // const prefersReducedMotionRef = useRef(prefersReducedMotion);
  const nodeRef = useRef<HTMLButtonElement | null>(null);

  // useEffect(() => {
  //   if (prefersReducedMotionRef.current) {
  //     return undefined;
  //   }

  //   const timeout = setTimeout(() => {
  //     setIsMounted(true);
  //   }, 100);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  let attachedClasses = ["box__inner", "box__inner--side-nav-closed"];

  if (menuOpen) {
    attachedClasses = ["box__inner", "box__inner--side-nav-open"];
  }

  return prefersReducedMotion ? (
    <button
      type="button"
      className="hamburger lg:hidden z-[15] cursor-pointer p-[15px] mr-[-15px]"
      onClick={onClickHandler}
    >
      <div className="hamburger__box">
        <div className={attachedClasses.join(" ")} />
      </div>
    </button>
  ) : (
    <TransitionGroup component={null}>
      {isMounted && (
        <CSSTransition
          in={isMounted}
          timeout={300}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <button
            type="button"
            className="hamburger lg:hidden z-[15] cursor-pointer p-[15px] mr-[15px]"
            onClick={onClickHandler}
            ref={nodeRef}
          >
            <div className="hamburger__box">
              <div className={attachedClasses.join(" ")} />
            </div>
          </button>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}

export default Hamburger;
