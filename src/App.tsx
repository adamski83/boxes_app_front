import MenuIcon from "@mui/icons-material/Menu";
import { Box, CssBaseline, Drawer, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { breakpoints } from "./breakpoints";
import { AuthProvider } from "./components/Auth/AuthContext/AuthContext";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import { EditBox } from "./components/Invoices/EditBox";
import { Invoices } from "./components/Invoices/Invoices";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { SidebarMenu } from "./components/Sidebar/SidebarMenu";
import { Orders } from "./Orders/Orders";
import { assignTokenIntoAPI } from "./services/assignTokenIntoAPI";
import { getTheme } from "./Theme/getTheme";
import { PATHS } from "./Urls/urls";
import { ThemeProviderWrapper } from "./Theme/ThemeContext";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = getTheme(mode);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    console.log("Theme toggled");
  };
  useEffect(() => {
    assignTokenIntoAPI();
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <CssBaseline />
        <div className="app">
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              zIndex: 1000,
            }}
            onClick={toggleTheme}
          >
            <ThemeToggle />
          </div>
          {isMobile ? (
            <>
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  zIndex: 1000,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              >
                <Box textAlign="center">
                  <SidebarMenu onClose={toggleDrawer(false)} />
                </Box>
              </Drawer>
            </>
          ) : (
            <SidebarMenu onClose={undefined} />
          )}
          <Toaster />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path={PATHS.home} element={<Home />} />
              <Route path={PATHS.dashboard} element={<Dashboard />} />
              <Route path={PATHS.qrScanner} element={<Invoices />} />
              <Route path="/edit/:id" element={<EditBox />} />
              <Route path={PATHS.invoices} element={<Orders />} />
            </Route>
            <Route path={PATHS.login} element={<Login />} />
            <Route path={PATHS.register} element={<Register />} />
            <Route path="*" element={<Navigate to={PATHS.login} />} />
          </Routes>
        </div>
      </ThemeProviderWrapper>
    </AuthProvider>
  );
};

export default App;
