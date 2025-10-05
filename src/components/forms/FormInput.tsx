import { TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  autoComplete?: string;
  type?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
}

export const FormInput = ({
  name,
  label,
  autoComplete,
  type = "text",
  placeholder,
  sx,
  style,
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
          sx={sx}
          style={style}
        />
      )}
    />
  );
};
