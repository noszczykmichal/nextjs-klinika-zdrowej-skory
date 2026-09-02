import { FormFieldConfig } from "@/types/types";
import { Field } from "react-final-form";

interface ContactFormFieldProps {
  fieldData: FormFieldConfig;
}

export default function ContactFormField({ fieldData }: ContactFormFieldProps) {
  const { component = "input", type, name, label, validator } = fieldData;

  const sharedClasses =
    "cursor-pointer border-b border-magenta-100 text-[var(--white-100)] autofill:!shadow-[inset_0_0_0_1000px_theme(colors.black.100)] autofill:[-webkit-text-fill-color:theme(colors.white.100)_!important] autofill:!font-medium autofill:[font-family:inherit_!important] autofill:[transition:background-color_5000s_ease-in-out_0s]";

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
              className={`${sharedClasses}`}
              id={name}
              autoComplete="true"
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
          <p className="min-h-[27px] text-[12px] text-red-500">
            {meta.error && meta.touched ? meta.error : ""}
          </p>
        </div>
      )}
    </Field>
  );
}
