import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const CheckboxField = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-3">
        <input
          ref={ref}
          type="checkbox"
          {...props}
          className="h-4 w-4 rounded"
        />

        <span>{label}</span>
      </label>
    );
  },
);

CheckboxField.displayName = "CheckboxField";
