import { forwardRef, InputHTMLAttributes } from "react";

import { FormField } from "./form-field";
import { Input } from "../ui/input";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <FormField label={label} error={error}>
        <Input ref={ref} {...props} />
      </FormField>
    );
  },
);

TextField.displayName = "TextField";
