// src/theme/ThemeContext.jsx
import { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";
import { lightPalette, darkPalette } from "./palette";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light",
        );
      },
      mode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" ? lightPalette : darkPalette),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor:
                  mode === "light"
                    ? lightPalette.custom.cardBg
                    : darkPalette.custom.cardBg,
                borderColor:
                  mode === "light"
                    ? lightPalette.custom.borderColor
                    : darkPalette.custom.borderColor,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                "&:hover": {
                  backgroundColor:
                    mode === "light"
                      ? lightPalette.custom.hoverBg
                      : darkPalette.custom.hoverBg,
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
