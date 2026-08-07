import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PageTitle({ children }: Props) {
  return <h1 className="text-3xl font-bold">{children}</h1>;
}
