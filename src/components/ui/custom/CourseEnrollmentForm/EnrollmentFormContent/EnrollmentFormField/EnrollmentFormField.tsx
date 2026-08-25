import { FormFieldConfig } from "@/types/types";
import { Field } from "react-final-form";
import { BasicEntityReference } from "@/types/types";
import clsx from "clsx";

interface EnrollmentFormFieldProps {
  fieldData: FormFieldConfig;
  availableTrainings?: BasicEntityReference[];
}

export default function EnrollmentFormField({
  fieldData,
  availableTrainings,
}: EnrollmentFormFieldProps) {
  const {
    component = "input",
    type,
    name,
    label,
    validator,
    wrapperClassName,
  } = fieldData;

  const sharedClasses =
    "cursor-pointer border-b border-magenta-100 autofill:!shadow-[inset_0_0_0_1000px_white] w-full placeholder:text-gray-500";

  return (
    <Field
      name={name}
      validate={validator}
      type={type === "checkbox" ? "checkbox" : undefined}
    >
      {({ input, meta }) => {
        const isSelectPlaceholder =
          component === "select" && input.value === "";

        let renderedInput;

        if (component === "select") {
          renderedInput = (
            <select
              {...input}
              name={name}
              className={clsx(sharedClasses, {
                "text-gray-500": isSelectPlaceholder,
                "text-black": !isSelectPlaceholder,
              })}
              id={name}
            >
              <option value="" disabled>
                Wybierz szkolenie z listy
              </option>
              {availableTrainings?.map((training) => (
                <option value={training.title} key={training._id}>
                  {training.title}
                </option>
              ))}
            </select>
          );
        } else if (type === "checkbox") {
          renderedInput = (
            <label className="cursor-pointer">
              <input
                {...input}
                type={type}
                name={name}
                className="accent-magenta-100 text-magenta-100 mr-2 cursor-pointer"
                id={name}
                autoComplete="true"
                spellCheck="false"
              />
              {label}
            </label>
          );
        } else {
          renderedInput = (
            <input
              {...input}
              type={type}
              name={name}
              placeholder={label}
              className={sharedClasses}
              id={name}
              autoComplete="true"
              spellCheck="false"
            />
          );
        }

        return (
          <div className={wrapperClassName}>
            <label htmlFor={name} className="sr-only">
              {label}
            </label>
            {renderedInput}
            <p className="min-h-[27px] text-[12px] text-red-500">
              {meta.error && meta.touched ? meta.error : ""}
            </p>
          </div>
        );
      }}
    </Field>
  );
}
