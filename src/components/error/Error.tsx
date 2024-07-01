import { Children } from "react";

type Props = {
  Children: string | undefined;
};

export const Error: React.FC<Props> = ({ Children }: Props) => {
  return <span className="login__error">{Children}</span>;
};
