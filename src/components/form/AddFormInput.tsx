import { TextField } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useId } from "react";

interface FormInputProps {
  name: string;
  label: string;
  autoComplete?: string;
  type?: string;
  placeholder?: string;
}

export const FormInput = ({
  name,
  label,
  autoComplete,
  type = "text",
  placeholder,
}: FormInputProps) => {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          id={`${id}-${name}`}
          label={label}
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          fullWidth
        />
      )}
    />
  );
};
