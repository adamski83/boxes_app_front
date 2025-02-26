import { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./components/Auth/AuthContext/AuthContext";
import { ThemeProviderWrapper } from "./Theme/ThemeContext";
import { AppRoutes } from "./AppRoutes";
import { Layout } from "../src/components/Layout/Layout";
import { useThemeMode } from "./Hooks/UseThemeMode";
import { assignTokenIntoAPI } from "./services/assignTokenIntoAPI";

const App: React.FC = () => {
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    assignTokenIntoAPI();
  }, []);

  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <CssBaseline />
        <Layout onThemeToggle={toggleTheme}>
          <Toaster />
          <AppRoutes />
        </Layout>
      </ThemeProviderWrapper>
    </AuthProvider>
  );
};

export default App;
