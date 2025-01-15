import { useState } from "react";
import { TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const handleChange = (event: { target: { value: string } }): void => {
    const newTerm = event.target.value;
    setLocalSearchTerm(newTerm);
    onSearch(newTerm);
  };

  return (
    <TextField
      margin="normal"
      fullWidth
      variant="outlined"
      placeholder="Search boxes..."
      value={localSearchTerm}
      onChange={handleChange}
    />
  );
};
