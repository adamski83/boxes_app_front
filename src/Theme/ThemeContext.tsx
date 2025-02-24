// src/theme/ThemeContext.jsx
import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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

          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2",
                  light: "#42a5f5",
                  dark: "#1565c0",
                  contrastText: "#ffffff",
                },
              }
            : {
                primary: {
                  main: "#90caf9",
                  light: "#e3f2fd",
                  dark: "#42a5f5",
                  contrastText: "#000000",
                },
              }),
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
