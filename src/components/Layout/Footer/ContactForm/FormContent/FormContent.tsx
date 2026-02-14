import { Dispatch, SetStateAction } from "react";

import { formConfig } from "@/utils/config";
import FormField from "@/components/Layout/Footer/ContactForm/FormContent/FormField/FormField";
import SuccessMessage from "@/components/Layout/Footer/ContactForm/FormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/ContactForm/FormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/ContactForm/FormContent/ErrorMessage/ErrorMessage";
import { ErrorState } from "@/types/types";

interface FormContentProps {
  handleSubmit: () => void;
  submitting: boolean | undefined;
  submitSucceeded: boolean | undefined;

  errorData: { errorMessage: string; hasError: boolean };
  setErrorHandler: Dispatch<SetStateAction<ErrorState>>;
}

export default function FormContent({
  handleSubmit,
  submitting,
  submitSucceeded,

  errorData,
  setErrorHandler,
}: FormContentProps) {
  const { hasError } = errorData;
  const shouldShowSuccess = !!(submitSucceeded && !hasError);

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
          className="w-auto self-start rounded-(--small-border-radius) border border-(--magenta-100) px-6 py-2 hover:cursor-pointer hover:bg-(--magenta-100) focus:bg-(--magenta-100) active:bg-(--magenta-100)"
          disabled={submitting}
        >
          Wyślij
        </button>
        <LoaderMessage submitting={submitting} />
        <SuccessMessage showSuccess={shouldShowSuccess} />
        <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
      </form>
    </>
  );
}
