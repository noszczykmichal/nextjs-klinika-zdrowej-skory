import { ErrorState } from "@/types/types";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface ErrorMessageProps {
  errorData: ErrorState;
  setErrorHandler: Dispatch<SetStateAction<ErrorState>>;
}

export default function ErrorMessage({
  errorData,
  setErrorHandler,
}: ErrorMessageProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { errorMessage, hasError } = errorData;
  const errorHandlerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (hasError) {
      errorHandlerRef.current = setTimeout(
        () =>
          setErrorHandler((prevState) => ({ ...prevState, hasError: false })),
        4000,
      );
    }

    return () => {
      if (errorHandlerRef.current) {
        clearTimeout(errorHandlerRef.current);
      }
    };
  }, [hasError, setErrorHandler]);

  return (
    <CSSTransition
      in={hasError}
      timeout={300}
      classNames="fade"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-[20px] bg-[var(--black-100)] opacity-90"
        ref={nodeRef}
      >
        <h3 className="text-center text-[20px] font-semibold">
          Coś poszło nie tak...
        </h3>
        <p>{`Błąd: ${errorMessage}`}</p>
        <p className="text-center">
          Spróbuj ponownie później lub skontaktuj się z nami telefonicznie.
        </p>
      </div>
    </CSSTransition>
  );
}
