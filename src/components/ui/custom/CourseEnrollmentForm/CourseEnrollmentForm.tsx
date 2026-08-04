import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import { formConfig } from "@/utils/config";
import FormField from "@/components/Layout/Footer/ContactForm/FormContent/FormField/FormField";
import SuccessMessage from "@/components/Layout/Footer/ContactForm/FormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/ContactForm/FormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/ContactForm/FormContent/ErrorMessage/ErrorMessage";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";
import { ErrorState } from "@/types/types";

interface InputData {
  [key: string]: string;
}

interface CourseEnrollmentFormProps {
  handleSubmit: () => void;
  submitting: boolean | undefined;
  submitSucceeded: boolean | undefined;
  formRestartHandler: (_initialValues?: Partial<InputData> | undefined) => void;
  errorData: { errorMessage: string; hasError: boolean };
  setErrorHandler: Dispatch<SetStateAction<ErrorState>>;
}

export default function CourseEnrollmentForm({
  handleSubmit,
  submitting,
  submitSucceeded,
  formRestartHandler,
  errorData,
  setErrorHandler,
}: CourseEnrollmentFormProps) {
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
        {formConfig.map((inputEl) => (
          <FormField fieldData={inputEl} key={inputEl.name} />
        ))}
      </fieldset>
      <OutlineButton type="submit">Wyślij</OutlineButton>
      <LoaderMessage submitting={submitting} />
      <SuccessMessage showSuccess={!errorData.errorMessage && showSuccess} />
      <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
    </form>
  );
}
