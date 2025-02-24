import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label: string;
  rules?: object;
}

export const FormInput = ({ name, label, rules, ...rest }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      {...register(name, rules)}
      label={label}
      error={!!errors[name]}
      helperText={errors[name]?.message as string}
      {...rest}
    />
  );
};
