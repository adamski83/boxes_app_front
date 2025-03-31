import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProductCategory } from "../../types/productCategoryType";
import React from "react";

interface CategoryFilterProps {
  onFilterChange: (categories: ProductCategory[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  onFilterChange,
}) => {
  const { t } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<
    ProductCategory[]
  >([]);

  const handleCategoryChange = (event: any) => {
    const { value } = event.target;
    setSelectedCategories(value);
    onFilterChange(value);
  };

  return (
    <Box sx={{ minWidth: 200, maxWidth: 400, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="category-filter-label">{t("form.category")}</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as ProductCategory[]).map((value) => (
                <Chip key={value} label={t(`form.categories.${value}`)} />
              ))}
            </Box>
          )}
        >
          {Object.values(ProductCategory).map((category) => (
            <MenuItem key={category} value={category}>
              {t(`form.categories.${category}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
