import { enrollmentFormConfig } from "@/utils/config";
import EnrollmentFormField from "@/components/ui/custom/CourseEnrollmentForm/EnrollmentFormContent/EnrollmentFormField/EnrollmentFormField";
import SuccessMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/SuccessMessage/SuccessMessage";
import LoaderMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/LoaderMessage/LoaderMessage";
import ErrorMessage from "@/components/Layout/Footer/ContactForm/ContactFormContent/ErrorMessage/ErrorMessage";
import OutlineButton from "@/components/ui/custom/OutlineButton/OutlineButton";
import type { BasicEntityReference, FormControls } from "@/types/types";
import { useFormSuccess } from "@/hooks/useFormSuccess";

interface EnrollmentFormContentProps extends FormControls {
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
  const { showSuccess } = useFormSuccess({
    submitSucceeded,
    errorData,
    formRestartHandler,
    onSuccess: onCloseDialog,
  });

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
      <SuccessMessage showSuccess={showSuccess} />
      <ErrorMessage errorData={errorData} setErrorHandler={setErrorHandler} />
    </form>
  );
}
