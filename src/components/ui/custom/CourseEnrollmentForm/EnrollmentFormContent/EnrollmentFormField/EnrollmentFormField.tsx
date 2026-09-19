import { FormFieldConfig } from "@/types/types";
import { Field } from "react-final-form";
import { BasicEntityReference } from "@/types/types";
import clsx from "clsx";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
            <Select value={input.value} onValueChange={input.onChange}>
              <SelectTrigger
                className={clsx(sharedClasses, {
                  "text-gray-500": isSelectPlaceholder,
                  "text-black": !isSelectPlaceholder,
                })}
              >
                <SelectValue placeholder="Wybierz szkolenie z listy" />
              </SelectTrigger>
              <SelectContent>
                {availableTrainings?.map((training) => (
                  <SelectItem value={training.title} key={training._id}>
                    {training.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        } else if (type === "checkbox") {
          renderedInput = (
            <div className="flex items-center">
              <input
                {...input}
                type={type}
                name={name}
                className="accent-magenta-100 text-magenta-100 mr-2 cursor-pointer"
                id={name}
                autoComplete="true"
                spellCheck="false"
              />
              <label htmlFor={name} className="cursor-pointer">
                {label}{" "}
                <Link
                  href="/polityka-prywatnosci"
                  className="hover:text-magenta-100 underline decoration-1 underline-offset-2 transition-colors duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  polityką prywatności
                </Link>
                .
              </label>
            </div>
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
              autoComplete="on"
              spellCheck="false"
            />
          );
        }

        return (
          <div className={wrapperClassName}>
            {type !== "checkbox" && (
              <label htmlFor={name} className="sr-only">
                {label}
              </label>
            )}
            {renderedInput}
            <p className="min-h-6.75 text-[12px] text-red-500">
              {meta.error && meta.touched ? meta.error : ""}
            </p>
          </div>
        );
      }}
    </Field>
  );
}
