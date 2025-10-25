import { FormFieldConfig } from "@/types/types";
import { Field } from "react-final-form";

interface FormFieldProps {
  fieldData: FormFieldConfig;
}

export default function FormField({ fieldData }: FormFieldProps) {
  const { component = "input", type, name, label, validator } = fieldData;

  const sharedClasses =
    "cursor-pointer border-b border-[var(--magenta-100)] text-[var(--white-100)] [--webkit-text-fill-color:#f00]";

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
