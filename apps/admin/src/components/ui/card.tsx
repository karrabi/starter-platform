import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}
