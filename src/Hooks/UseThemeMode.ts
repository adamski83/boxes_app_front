import { useState } from "react";
import { Theme } from "../types/themeType";

export const useThemeMode = () => {
  const [mode, setMode] = useState<Theme>(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "dark" ? Theme.DARK : Theme.LIGHT;
  });

  const toggleTheme = () => {
    const newMode = mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem("themeMode", newMode);
    setMode(newMode);
  };

  return { mode, toggleTheme };
};
