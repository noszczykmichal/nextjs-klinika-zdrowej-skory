import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import { contactFormConfig } from "@/utils/config";
import ContactFormField from "@/components/Layout/Footer/ContactForm/ContactFormContent/ContactFormField/ContactFormField";
import SuccessMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/ErrorMessage/ErrorMessage";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";
import { ErrorState } from "@/types/types";

interface InputData {
  [key: string]: string;
}

interface FormContentProps {
  handleSubmit: () => void;
  submitting: boolean | undefined;
  submitSucceeded: boolean | undefined;
  formRestartHandler: (_initialValues?: Partial<InputData> | undefined) => void;
  errorData: { errorMessage: string; hasError: boolean };
  setErrorHandler: Dispatch<SetStateAction<ErrorState>>;
}

export default function FormContent({
  handleSubmit,
  submitting,
  submitSucceeded,
  formRestartHandler,
  errorData,
  setErrorHandler,
}: FormContentProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout>(null);
  const formRestartTimerRef = useRef<NodeJS.Timeout>(null);
  const { errorMessage } = errorData;

  useEffect(() => {
    if (!errorMessage && submitSucceeded) {
      setShowSuccess(true);
      successTimerRef.current = setTimeout(() => setShowSuccess(false), 4000);
      formRestartTimerRef.current = setTimeout(
        () => formRestartHandler(),
        4100,
      );
    }

    return () => {
      if (successTimerRef.current && formRestartTimerRef.current) {
        clearTimeout(successTimerRef.current);
        clearTimeout(formRestartTimerRef.current);
      }
    };
  }, [submitSucceeded, errorMessage, formRestartHandler]);

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col">
      <fieldset className="flex flex-col">
        <legend className="font-semibold">Napisz do nas!</legend>
        {contactFormConfig.map((inputEl) => (
          <ContactFormField fieldData={inputEl} key={inputEl.name} />
        ))}
      </fieldset>
      <OutlineButton type="submit">Wyślij</OutlineButton>
      <LoaderMessage submitting={submitting} />
      <SuccessMessage showSuccess={!errorData.errorMessage && showSuccess} />
      <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
    </form>
  );
}
