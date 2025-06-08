"use client";

import { Form, Field } from "react-final-form";

export default function ContactForm() {
  return (
    <Form
      onSubmit={(e) => e.prevent.Default()}
      validated={() => console.log("hey")}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
          <fieldset className="flex flex-col gap-[10px]">
            <legend className="font-semibold">Napisz do nas!</legend>
            <div>
              <label htmlFor="full-name" className="sr-only">
                Imię i Nazwisko:
              </label>
              <Field
                name="full_name"
                component="input"
                placeholder="Imię i Nazwisko"
                className="cursor-pointer border-b border-[var(--magenta-100)]"
                id="full-name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email:
              </label>
              <Field
                name="email"
                component="input"
                placeholder="E-mail"
                className="cursor-pointer border-b border-[var(--magenta-100)]"
                id="email"
              />
            </div>
            <div>
              <label htmlFor="tel" className="sr-only">
                Telefon
              </label>
              <Field
                name="telefon"
                component="input"
                placeholder="Telefon"
                className="cursor-pointer border-b border-[var(--magenta-100)]"
                id="tel"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Wiadomość
              </label>
              <Field
                name="message"
                component="textarea"
                placeholder="Wiadomość"
                rows={4}
                cols={50}
                className="cursor-pointer resize-none border-b border-[var(--magenta-100)]"
                id="message"
              />
            </div>
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
