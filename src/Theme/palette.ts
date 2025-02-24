import { PaletteOptions } from "@mui/material";

interface CustomPaletteOptions extends PaletteOptions {
  custom?: {
    cardBg: string;
    borderColor: string;
    hoverBg: string;
  };
}

export const lightPalette: CustomPaletteOptions = {
  mode: "light",
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9c27b0",
    light: "#ba68c8",
    dark: "#7b1fa2",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  custom: {
    cardBg: "#ffffff",
    borderColor: "#e0e0e0",
    hoverBg: "#f5f5f5",
  },
};

export const darkPalette: CustomPaletteOptions = {
  mode: "dark",
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#42a5f5",
    contrastText: "#000000",
  },
  secondary: {
    main: "#ce93d8",
    light: "#f3e5f5",
    dark: "#ab47bc",
    contrastText: "#000000",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  custom: {
    cardBg: "#1e1e1e",
    borderColor: "#333333",
    hoverBg: "#2c2c2c",
  },
};
