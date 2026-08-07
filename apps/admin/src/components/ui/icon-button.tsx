import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function IconButton({ children, className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`rounded-lg border p-2 transition hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
}
