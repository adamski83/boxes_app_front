import { createTheme, Theme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette.ts";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      cardBg: string;
      borderColor: string;
      hoverBg: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      cardBg: string;
      borderColor: string;
      hoverBg: string;
    };
  }
}

export const getTheme = (mode: "light" | "dark"): Theme => {
  return createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#ffffff" : "#1e1e1e",
            borderRadius: 8,
            boxShadow:
              mode === "light"
                ? "0 2px 4px rgba(0,0,0,0.1)"
                : "0 2px 4px rgba(0,0,0,0.3)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
    },
  });
};
