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
        className="absolute inset-0 flex flex-col items-center justify-center gap-[20px] bg-[var(--black-100)] opacity-90"
        ref={nodeRef}
        data-testid="success-message"
      >
        <h3 className="text-center text-[20px] font-semibold">
          Wiadomość wysłana!
        </h3>
        <p className="text-center">Dziękujemy za kontakt.</p>
      </div>
    </CSSTransition>
  );
}
