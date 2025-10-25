import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
  Theme,
} from "@mui/material";

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps<T = string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  minWidth?: number | string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  sx?: SxProps<Theme>;
  id?: string;
  name?: string;
}

export const SelectField = <T extends string = string>({
  label,
  value,
  onChange,
  options,
  minWidth = 150,
  fullWidth = false,
  disabled = false,
  error = false,
  helperText,
  required = false,
  sx,
  id,
  name,
}: SelectFieldProps<T>) => {
  const handleChange = (event: SelectChangeEvent<T>) => {
    onChange(event.target.value as T);
  };

  const labelId = id
    ? `${id}-label`
    : `${label.toLowerCase().replace(/\s+/g, "-")}-label`;
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <FormControl
      sx={{
        minWidth: fullWidth ? undefined : minWidth,
        width: fullWidth ? "100%" : undefined,
        ...sx,
      }}
      error={error}
      disabled={disabled}
      required={required}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        name={name || selectId}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <span
          style={{
            fontSize: "0.75rem",
            color: error ? "#d32f2f" : "rgba(0, 0, 0, 0.6)",
            marginTop: "3px",
            marginLeft: "14px",
          }}
        >
          {helperText}
        </span>
      )}
    </FormControl>
  );
};
