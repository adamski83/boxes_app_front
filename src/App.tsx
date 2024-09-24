import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { PATHS } from "./urls/urls";
import { Register } from "./components/register/Register";
import { Login } from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { assignTokenIntoAPI } from "./services/assignTokenIntoAPI";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Drawer, IconButton } from "@mui/material";
import { breakpoints } from "./breakpoints";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));

  useEffect(() => {
    assignTokenIntoAPI();
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AuthProvider>
      <div className="app">
        {isMobile ? (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <SidebarMenu onClose={toggleDrawer(false)} />
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
            <Route path={PATHS.invoices} element={<Invoices />} />
            {/* <Route path="/edit/:id" element={<EditDialog />} />
            <Route path="/scan" element={<QRScanner />} /> */}
          </Route>
          <Route path={PATHS.login} element={<Login />} />
          <Route path={PATHS.register} element={<Register />} />
          <Route path="*" element={<Navigate to={PATHS.login} />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
