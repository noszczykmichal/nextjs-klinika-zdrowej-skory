"use client";

import { Form } from "react-final-form";

import { formConfig } from "@/utils/config";
import FormField from "@/components/Layout/Footer/Form/FormField/FormField";

export default function ContactForm() {
  return (
    <Form
      onSubmit={(v) => console.log(v)}
      validated={() => console.log("hey")}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
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
        </form>
      )}
    />
  );
}
