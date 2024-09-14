import "./App.css";
import { SidebarMenu } from "./components/sidebar/SidebarMenu";
import { Route, Routes } from "react-router-dom";
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

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    assignTokenIntoAPI();
  }, []);

  return (
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
        <SidebarMenu />
      )}
      <Toaster />
      <Routes>
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.dashboard} element={<Dashboard />} />
        <Route path={PATHS.invoices} element={<Invoices />} />
        <Route path={PATHS.login} element={<Login />} />
        <Route path={PATHS.register} element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
