import { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AuthProvider } from "./components/Auth/AuthContext/AuthContext";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { AppRoutes } from "./AppRoutes";
import { Layout } from "../src/components/Layout/Layout";
import { useThemeMode } from "./hooks/useThemeMode";
import { assignTokenIntoAPI } from "./services/assignTokenIntoAPI";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallbackComponent } from "./components/common/Error/ErrorBoundaryFallbackComponent";

const App: React.FC = () => {
  const { toggleTheme } = useThemeMode();

  useEffect(() => {
    assignTokenIntoAPI();
  }, []);
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
          <CssBaseline />
          <Layout onThemeToggle={toggleTheme}>
            <Toaster />
            <AppRoutes />
          </Layout>
        </ErrorBoundary>
      </ThemeProviderWrapper>
    </AuthProvider>
  );
};

export default App;
