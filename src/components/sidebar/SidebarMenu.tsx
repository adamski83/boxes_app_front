import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";
import { DASHBOARD, INVOICES } from "src/urls/urls";

export const SidebarMenu = () => {
  return (
    <Sidebar>
      <Menu>
        <MenuItem
          component={<Link to="/" className="link" />}
          className="menu1"
          icon={<MenuRoundedIcon />}
        >
          <h2>Sacs Box</h2>
        </MenuItem>
        <MenuItem
          component={<Link to={DASHBOARD} className="link" />}
          icon={<GridViewRoundedIcon />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          component={<Link to={INVOICES} className="link" />}
          icon={<ReceiptRoundedIcon />}
        >
          Invoices
        </MenuItem>
        <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
          <MenuItem icon={<AccountCircleRoundedIcon />}>Account</MenuItem>
        </SubMenu>
        <MenuItem
          icon={<LogoutRoundedIcon />}
          component={<Link to={"/logout"} className="link" />}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
