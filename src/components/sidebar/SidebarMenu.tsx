import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import React from "react";
export const SidebarMenu = ({ onClose }: any) => {
  const role = localStorage.getItem("user_role");

  const { t } = useTranslation();
  const menuItems = [
    {
      to: "",
      className: "menu1",
      icon: <MenuRoundedIcon onClick={onClose} />,
      label: (
        <div>
          <p>{role}</p>
        </div>
      ),
    },
    {
      to: "/dashboard",
      icon: <GridViewRoundedIcon onClick={onClose} />,
      label: <>{t("sidebar.menu.dashboard")}</>,
    },
    {
      to: "/qr-scanner",
      icon: <ReceiptRoundedIcon onClick={onClose} />,
      label: <>{t("sidebar.menu.qrScanner")}</>,
    },
    {
      to: "/Invoices",
      label: <>{t("sidebar.menu.invoices")}</>,
      icon: <SettingsApplicationsRoundedIcon onClick={onClose} />,
    },
    {
      to: "/Charts",
      label: <>{t("sidebar.menu.charts")}</>,
      icon: <SettingsApplicationsRoundedIcon onClick={onClose} />,
    },
    {
      to: "/login",
      icon: <LogoutRoundedIcon onClick={onClose} />,
      label: <>{t("sidebar.menu.logout")}</>,
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
