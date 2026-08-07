import { forwardRef, TextareaHTMLAttributes } from "react";

import { FormField } from "./form-field";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <FormField label={label} error={error}>
        <textarea
          ref={ref}
          {...props}
          className="min-h-32 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </FormField>
    );
  },
);

TextArea.displayName = "TextArea";
