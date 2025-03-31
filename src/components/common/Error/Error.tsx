import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  response?: string;
};

export const Error: React.FC<Props> = ({ children }: Props) => {
  return <span className="login__error">{children}</span>;
};
