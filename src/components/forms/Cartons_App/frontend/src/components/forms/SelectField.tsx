import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface SelectFieldProps {
  label: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select value={selectedValue} onChange={handleChange} label={label}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;