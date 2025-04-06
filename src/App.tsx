import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./components/Auth/AuthContext/AuthContext";
import { ErrorFallbackComponent } from "./components/common/Error/ErrorBoundaryFallbackComponent";
import { Layout } from "./components/layouts/MainLayout/MainLayout";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { useThemeMode } from "./hooks/useThemeMode";
import { assignTokenIntoAPI } from "./services/assignTokenIntoAPI";

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
