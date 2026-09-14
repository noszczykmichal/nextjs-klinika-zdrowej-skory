import { FormFieldConfig } from "@/types/types";
import { Field } from "react-final-form";

interface ContactFormFieldProps {
  fieldData: FormFieldConfig;
}

export default function ContactFormField({ fieldData }: ContactFormFieldProps) {
  const { component = "input", type, name, label, validator } = fieldData;

  const sharedClasses =
    "autofill:!shadow-[0_0_0_1000px_var(--black-100)_inset] autofill:![-webkit-text-fill-color:var(--white-100)] autofill:!font-medium autofill:!font-[inherit] autofill:[transition:background-color_5000s_ease-in-out_0s]";

  return (
    <Field component={component} name={name} validate={validator}>
      {({ input, meta }) => (
        <div className="flex flex-col">
          <label htmlFor={name} className="sr-only">
            {label}
          </label>
          {component === "input" ? (
            <input
              {...input}
              type={type}
              name={name}
              placeholder={label}
              className={`contact-form-input ${sharedClasses}`}
              id={name}
              autoComplete="on"
              spellCheck="false"
            />
          ) : (
            <textarea
              {...input}
              name={name}
              placeholder={label}
              rows={4}
              className={`${sharedClasses} resize-none`}
              id={name}
            />
          )}
          <p className="min-h-6.75 text-[12px] text-red-500">
            {meta.error && meta.touched ? meta.error : ""}
          </p>
        </div>
      )}
    </Field>
  );
}
