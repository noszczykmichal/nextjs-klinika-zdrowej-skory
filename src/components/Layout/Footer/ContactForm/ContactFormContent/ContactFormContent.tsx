import { contactFormConfig } from "@/utils/config";
import ContactFormField from "@/components/Layout/Footer/ContactForm/ContactFormContent/ContactFormField/ContactFormField";
import SuccessMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/ErrorMessage/ErrorMessage";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";
import type { FormControls } from "@/types/types";
import { useFormSuccess } from "@/hooks/useFormSuccess";

export default function ContactFormContent({
  handleSubmit,
  submitting,
  submitSucceeded,
  formRestartHandler,
  errorData,
  setErrorHandler,
}: FormControls) {
  const { showSuccess } = useFormSuccess({
    submitSucceeded,
    errorData,
    formRestartHandler,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col justify-between"
    >
      <fieldset className="flex flex-col">
        <legend className="font-semibold">Napisz do nas!</legend>
        {contactFormConfig.map((inputEl) => (
          <ContactFormField fieldData={inputEl} key={inputEl.name} />
        ))}
      </fieldset>
      <OutlineButton type="submit" footnote={true}>
        Wyślij
      </OutlineButton>
      <LoaderMessage submitting={submitting} />
      <SuccessMessage showSuccess={showSuccess} />
      <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
    </form>
  );
}
