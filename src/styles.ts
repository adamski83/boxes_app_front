import { createTheme, Theme } from "@mui/material/styles";

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

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      cardBg: string;
      borderColor: string;
      hoverBg: string;
      success: string;
      warning: string;
      error: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      cardBg: string;
      borderColor: string;
      hoverBg: string;
      success: string;
      warning: string;
      error: string;
    };
  }
}

export const lightPalette = {
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },
  custom: {
    cardBg: "#ffffff",
    borderColor: "#e0e0e0",
    hoverBg: "#f5f5f5",
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
  },
};

export const darkPalette = {
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#42a5f5",
  },
  custom: {
    cardBg: "#1e1e1e",
    borderColor: "#333333",
    hoverBg: "#2c2c2c",
    success: "#66bb6a",
    warning: "#ffb74d",
    error: "#ef5350",
  },
};
