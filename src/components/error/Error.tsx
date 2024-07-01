import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const Error: React.FC<Props> = ({ children }: Props) => {
  return <span className="login__error">{children}</span>;
};
