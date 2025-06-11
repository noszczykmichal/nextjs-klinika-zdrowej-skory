import {
  useState,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { FormApi } from "final-form";

import { formConfig } from "@/utils/config";
import FormField from "@/components/Layout/Footer/Form/FormContent/FormField/FormField";
import SuccessMessage from "@/components/Layout/Footer/Form/FormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/Form/FormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/Form/FormContent/ErrorMessage/ErrorMessage";
import { ErrorState } from "@/types/types";

interface InputData {
  [key: string]: string;
}

interface FormContentProps {
  handleSubmit: () => void;
  submitting: boolean;
  submitSucceeded: boolean;
  form: FormApi<InputData, Partial<InputData>>;
  errorData: { errorMessage: string; hasError: boolean };
  setErrorHandler: Dispatch<SetStateAction<ErrorState>>;
}

export default function FormContent({
  handleSubmit,
  submitting,
  submitSucceeded,
  form,
  errorData,
  setErrorHandler,
}: FormContentProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout>(null);
  const formRestartTimerRef = useRef<NodeJS.Timeout>(null);
  const formRestart = useCallback(() => form.restart(), [form]);

  useEffect(() => {
    if (!errorData.errorMessage && submitSucceeded) {
      setShowSuccess(true);
      successTimerRef.current = setTimeout(() => setShowSuccess(false), 4000);
      formRestartTimerRef.current = setTimeout(() => formRestart(), 4100);
    }

    return () => {
      if (successTimerRef.current && formRestartTimerRef.current) {
        clearTimeout(successTimerRef.current);
        clearTimeout(formRestartTimerRef.current);
      }
    };
  }, [submitSucceeded, formRestart, errorData.errorMessage]);

  return (
    <>
      <form onSubmit={handleSubmit} className="relative flex flex-col">
        <fieldset className="flex flex-col">
          <legend className="font-semibold">Napisz do nas!</legend>
          {formConfig.map((inputEl) => (
            <FormField fieldData={inputEl} key={inputEl.name} />
          ))}
        </fieldset>
        <button
          type="submit"
          className="w-auto self-start rounded-[var(--small-border-radius)] border border-[var(--magenta-100)] px-6 py-2 hover:cursor-pointer hover:bg-[var(--magenta-100)]"
        >
          Wyślij
        </button>
        <LoaderMessage submitting={submitting} />
        <SuccessMessage showSuccess={!errorData.errorMessage && showSuccess} />
        <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
      </form>
    </>
  );
}
