import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SidebarMenu } from "../Sidebar/SidebarMenu";

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: (open: boolean) => () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onToggle,
}) => (
  <>
    <IconButton
      onClick={onToggle(true)}
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
      open={isOpen}
      onClose={onToggle(false)}
      PaperProps={{
        sx: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Box textAlign="center">
        <SidebarMenu onClose={onToggle(false)} />
      </Box>
    </Drawer>
  </>
);
