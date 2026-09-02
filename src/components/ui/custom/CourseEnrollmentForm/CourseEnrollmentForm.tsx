import { useState } from "react";
import { Form } from "react-final-form";

import EnrollmentFormContent from "@/components/ui/custom/CourseEnrollmentForm/EnrollmentFormContent/EnrollmentFormContent";
import { BasicEntityReference, FormValues } from "@/types/types";

type CourseEnrollmentFormValues = Pick<
  FormValues,
  "name" | "surname" | "email" | "tel" | "selected_training" | "privacy_policy"
>;

interface CourseEnrollmentFormProps {
  availableTrainings: BasicEntityReference[];
  onSubmit: () => void;
}

export default function CourseEnrollmentForm({
  availableTrainings,
  onSubmit,
}: CourseEnrollmentFormProps) {
  const [errorState, setErrorState] = useState({
    errorMessage: "",
    hasError: false,
  });

  const submitHandler = async (formData: CourseEnrollmentFormValues) => {
    try {
      setErrorState({
        errorMessage: "",
        hasError: false,
      });
      const data = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const sendData = await fetch("https://formspree.io/f/xnpaknye", data);
      const response = await sendData.json();

      if (!response.ok) {
        throw new Error(response.error);
      }
    } catch (error) {
      setErrorState({
        errorMessage: `${error}`,
        hasError: true,
      });
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      render={({ handleSubmit, submitting, submitSucceeded, form }) => (
        <EnrollmentFormContent
          handleSubmit={handleSubmit}
          submitting={submitting}
          submitSucceeded={submitSucceeded}
          formRestartHandler={() => form.restart()}
          errorData={errorState}
          setErrorHandler={setErrorState}
          availableTrainings={availableTrainings}
          onCloseDialog={onSubmit}
        />
      )}
    />
  );
}
