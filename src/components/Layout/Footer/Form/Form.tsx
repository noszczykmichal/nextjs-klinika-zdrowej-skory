"use client";

import { useState } from "react";
import { Form } from "react-final-form";

import FormContent from "@/components/Layout/Footer/Form/FormContent/FormContent";

interface InputData {
  [key: string]: string;
}

export default function ContactForm() {
  const [errorState, setErrorState] = useState({
    errorMessage: "",
    hasError: false,
  });

  const submitHandler = async (formData: InputData) => {
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
        <FormContent
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
