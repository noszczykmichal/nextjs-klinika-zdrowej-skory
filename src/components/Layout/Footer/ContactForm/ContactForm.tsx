"use client";

import { useState } from "react";
import { Form } from "react-final-form";

import ContactFormContent from "@/components/Layout/Footer/ContactForm/ContactFormContent/ContactFormContent";
import { FormValues } from "@/types/types";

type ContactFormValues = Pick<
  FormValues,
  "full_name" | "email" | "tel" | "message"
>;

export default function ContactForm() {
  const [errorState, setErrorState] = useState({
    errorMessage: "",
    hasError: false,
  });

  const submitHandler = async (formData: ContactFormValues) => {
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

      const sendData = await fetch("https://formspree.io/f/xvgrklwk", data);
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
        <ContactFormContent
          handleSubmit={handleSubmit}
          submitting={submitting}
          submitSucceeded={submitSucceeded}
          formRestartHandler={() => form.restart()}
          errorData={errorState}
          setErrorHandler={setErrorState}
        />
      )}
    />
  );
}
