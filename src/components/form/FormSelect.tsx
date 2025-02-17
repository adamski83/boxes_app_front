import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";

interface FormSelectProps {
  name: string;
  label: string;
  options: readonly string[];
}

export const FormSelect = ({ name, label, options }: FormSelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel>{label}</InputLabel>
      <Select {...register(name)} label={label}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
