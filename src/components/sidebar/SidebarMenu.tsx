import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
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
      to: "/invoices",
      icon: <ReceiptRoundedIcon onClick={onClose} />,
      label: "Invoices",
    },
    {
      label: "Settings",
      icon: <SettingsApplicationsRoundedIcon onClick={onClose} />,
      subMenu: [
        {
          icon: <AccountCircleRoundedIcon onClick={onClose} />,
          label: "Account",
        },
      ],
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
          if (item.subMenu) {
            return (
              <SubMenu key={index} label={item.label} icon={item.icon}>
                {item.subMenu.map((subItem, subIndex) => (
                  <MenuItem key={subIndex} icon={subItem.icon}>
                    {subItem.label}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          }
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
