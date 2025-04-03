import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useId } from "react";

interface FormSelectProps {
  name: string;
  label: string;
  options: readonly string[];
}

export const FormSelect = ({ name, label, options }: FormSelectProps) => {
  const { control } = useFormContext();
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${id}-${name}-label`}>{label}</InputLabel>
          <Select
            {...field}
            labelId={`${id}-${name}-label`}
            id={`${id}-${name}`}
            value={field.value || ""}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
