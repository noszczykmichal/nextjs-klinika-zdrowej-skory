import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import { enrollmentFormConfig } from "@/utils/config";
import EnrollmentFormField from "@/components/ui/custom/CourseEnrollmentForm/EnrollmentFormContent/EnrollmentFormField/EnrollmentFormField";
import SuccessMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/ErrorMessage/ErrorMessage";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";
import { BasicEntityReference, ErrorState } from "@/types/types";

interface InputData {
  [key: string]: string;
}

interface EnrollmentFormContentProps {
  handleSubmit: () => void;
  submitting: boolean | undefined;
  submitSucceeded: boolean | undefined;
  formRestartHandler: (_initialValues?: Partial<InputData> | undefined) => void;
  errorData: { errorMessage: string; hasError: boolean };
  setErrorHandler: Dispatch<SetStateAction<ErrorState>>;
  availableTrainings: BasicEntityReference[];
  onCloseDialog: () => void;
}

export default function EnrollmentFormContent({
  handleSubmit,
  submitting,
  submitSucceeded,
  formRestartHandler,
  errorData,
  setErrorHandler,
  availableTrainings,
  onCloseDialog,
}: EnrollmentFormContentProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout>(null);
  const { errorMessage } = errorData;

  useEffect(() => {
    if (!errorMessage && submitSucceeded) {
      setShowSuccess(true);
      successTimerRef.current = setTimeout(() => {
        setShowSuccess(false);
        formRestartHandler();
        onCloseDialog();
      }, 4000);
    }

    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, [submitSucceeded, errorMessage, formRestartHandler]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4">
      <fieldset className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-x-8">
        {enrollmentFormConfig.map((inputEl) => (
          <EnrollmentFormField
            fieldData={inputEl}
            key={inputEl.name}
            availableTrainings={availableTrainings}
          />
        ))}
      </fieldset>
      <OutlineButton type="submit">Wyślij</OutlineButton>
      <LoaderMessage submitting={submitting} />
      <SuccessMessage showSuccess={!errorData.errorMessage && showSuccess} />
      <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
    </form>
  );
}
