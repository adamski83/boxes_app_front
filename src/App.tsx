import "./App.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Invoices from "./components/invoices/Invoices";
import { HOME, DASHBOARD, INVOICES } from "./urls/urls";

function App() {
  return (
    <div className="app">
      <Sidebar>
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            icon={<MenuRoundedIcon />}>
            <h2>Sacs Box</h2>
          </MenuItem>
          <MenuItem
            component={<Link to={DASHBOARD} className="link" />}
            icon={<GridViewRoundedIcon />}>
						Dashboard
          </MenuItem>
          <MenuItem
            component={<Link to={INVOICES} className="link" />}
            icon={<ReceiptRoundedIcon />}>
						Invoices
          </MenuItem>
          <SubMenu
            label="Settings"
            icon={<SettingsApplicationsRoundedIcon />}>
            <MenuItem icon={<AccountCircleRoundedIcon />}>
							Account
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
        </Menu>
      </Sidebar>
      <section className="section">
        <Routes>
          <Route path={HOME} element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
