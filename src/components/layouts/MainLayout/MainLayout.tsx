import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { breakpoints } from "../../../constants/breakpoints";
import { MobileNavigation } from "../../common/MobileNavigation/MobileNavigation";
import ThemeToggle from "../../common/ThemeToggle/ThemeToggle";
import { SidebarMenu } from "../Sidebar/SidebarMenu";

interface LayoutProps {
  children: React.ReactNode;
  onThemeToggle: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onThemeToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoints.sm));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <div className="app">
      <div className="theme-toggle" onClick={onThemeToggle}>
        <ThemeToggle />
      </div>

      {isMobile ? (
        <MobileNavigation isOpen={isDrawerOpen} onToggle={toggleDrawer} />
      ) : (
        <SidebarMenu onClose={undefined} />
      )}

      {children}
    </div>
  );
};
