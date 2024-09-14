import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export const SidebarMenu = ({ onClose }: any) => {
  const menuItems = [
    {
      className: "menu1",
      icon: <MenuRoundedIcon onClick={onClose} />,
      label: <h2>Your Box</h2>,
    },
    {
      to: "/dashboard",
      icon: <GridViewRoundedIcon />,
      label: "Dashboard",
    },
    {
      to: "/invoices",
      icon: <ReceiptRoundedIcon />,
      label: "Invoices",
    },
    {
      label: "Settings",
      icon: <SettingsApplicationsRoundedIcon />,
      subMenu: [
        {
          icon: <AccountCircleRoundedIcon />,
          label: "Account",
        },
      ],
    },
    {
      to: "/login",
      icon: <LogoutRoundedIcon />,
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
