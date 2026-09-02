import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface SuccessMessageProps {
  showSuccess: boolean;
}

export default function SuccessMessage({ showSuccess }: SuccessMessageProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={showSuccess}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="bg-black-100/90 absolute inset-0 flex flex-col items-center justify-center gap-5 rounded-lg"
        ref={nodeRef}
        data-testid="success-message"
      >
        <h3 className="text-white-100 text-center text-xl font-semibold">
          Wiadomość wysłana!
        </h3>
        <p className="text-white-100 text-center">Dziękujemy za kontakt.</p>
      </div>
    </CSSTransition>
  );
}
