"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Form } from "react-final-form";

import { formConfig } from "@/utils/config";
import FormField from "@/components/Layout/Footer/Form/FormField/FormField";
import Loader from "@/components/ui/custom/Loader/Loader";

const Countdown = dynamic(
  () => import("@/components/ui/custom/Countdown/Countdown"),
  { ssr: false },
);

interface InputData {
  [key: string]: string;
}

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (formData: InputData[]) => {
    try {
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

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      onSubmit={() => console.log("sending")}
      render={({ handleSubmit }) => (
        <>
          <form onSubmit={handleSubmit} className="relative flex flex-col">
            <fieldset className="flex flex-col">
              <legend className="font-semibold">Napisz do nas!</legend>
              {formConfig.map((inputEl) => (
                <FormField fieldData={inputEl} key={inputEl.name} />
              ))}
            </fieldset>
            <button
              onClick={() => {
                setSubmitting(true);
              }}
              className="w-auto self-start rounded-[var(--small-border-radius)] border border-[var(--magenta-100)] px-6 py-2 hover:cursor-pointer hover:bg-[var(--magenta-100)]"
            >
              Wyślij
            </button>
            {submitting && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--black-100)] opacity-90">
                <Loader />
                <p>Wysyłanie...</p>
              </div>
            )}
          </form>
        </>
      )}
    />
  );
}
