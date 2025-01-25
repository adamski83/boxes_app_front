import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export const SidebarMenu = ({ onClose }: any) => {
  const menuItems = [
    {
      to: "",
      className: "menu1",
      icon: <MenuRoundedIcon onClick={onClose} />,
      label: <h2>Your Box</h2>,
    },
    {
      to: "/dashboard",
      icon: <GridViewRoundedIcon onClick={onClose} />,
      label: "Dashboard",
    },
    {
      to: "/qr-scanner",
      icon: <ReceiptRoundedIcon onClick={onClose} />,
      label: "QR Scanner",
    },
    {
      to: "/Invoices",
      label: "Invoices",
      icon: <SettingsApplicationsRoundedIcon onClick={onClose} />,
    },
    {
      to: "/login",
      icon: <LogoutRoundedIcon onClick={onClose} />,
      label: "Logout",
    },
  ];

  return (
    <Sidebar rootStyles={{ width: "340px", minHeight: "100vh" }}>
      <Menu>
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              component={<Link to={item.to || ""} className="link" />}
              className={item.className}
              icon={item.icon}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Sidebar>
  );
};
