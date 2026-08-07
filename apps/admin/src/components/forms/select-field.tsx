import { forwardRef, SelectHTMLAttributes } from "react";

import { FormField } from "./form-field";

export interface SelectOption {
  value: string | number;
  label: string;
}

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: SelectOption[];
};

export const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, ...props }, ref) => {
    return (
      <FormField label={label} error={error}>
        <select
          ref={ref}
          {...props}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    );
  },
);

SelectField.displayName = "SelectField";
