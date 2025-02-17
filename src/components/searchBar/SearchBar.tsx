import { useState } from "react";
import { TextField } from "@mui/material";

import { useTranslation } from "react-i18next";

interface SearchBarProps {
  onSearch: (term: string) => void;
}
export const translate = {
  en: {
    searchBoxes: "Search boxes...",
  },
  pl: {
    searchBoxes: "Szukaj opakowań...",
  },
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const { t } = useTranslation();
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
      placeholder={t("translate.searchBoxes")}
      value={localSearchTerm}
      onChange={handleChange}
    />
  );
};
