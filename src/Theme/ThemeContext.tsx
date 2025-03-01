import React, { createContext, useState, useMemo, ReactNode } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { lightPalette, darkPalette } from "./palette";

export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: ThemeMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: ThemeMode.LIGHT,
});

export const ThemeProviderWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT;
  });

  const toggleColorMode = () => {
    const newMode = mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    localStorage.setItem("themeMode", newMode);
    setMode(newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode === ThemeMode.LIGHT ? "light" : "dark",
          ...(mode === ThemeMode.LIGHT ? lightPalette : darkPalette),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor:
                  mode === ThemeMode.LIGHT
                    ? lightPalette.custom.cardBg
                    : darkPalette.custom.cardBg,
                borderColor:
                  mode === ThemeMode.LIGHT
                    ? lightPalette.custom.borderColor
                    : darkPalette.custom.borderColor,
              },
            },
          },
          // ...pozostałe komponenty
        },
      }),
    [mode],
  );

  const contextValue = useMemo(
    () => ({
      toggleColorMode,
      mode,
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
