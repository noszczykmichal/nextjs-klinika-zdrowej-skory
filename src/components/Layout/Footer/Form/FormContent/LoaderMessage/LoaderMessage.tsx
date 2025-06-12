import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import Loader from "@/components/ui/custom/Loader/Loader";

interface LoaderMessageProps {
  submitting: boolean;
}

export default function LoaderMessage({ submitting }: LoaderMessageProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={submitting}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--black-100)] opacity-90"
        ref={nodeRef}
      >
        <Loader />
        <p>Wysyłanie...</p>
      </div>
    </CSSTransition>
  );
}
