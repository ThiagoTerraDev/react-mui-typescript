import { 
  Avatar, 
  Box, 
  Divider, 
  Drawer, 
  Icon, 
  List, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  useMediaQuery, 
  useTheme 
} from "@mui/material";
import { useAppThemeContext, useAuthContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";


interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface ISidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={ smDown ? "temporary" : "permanent" } onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
            <Avatar 
              sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
              src="avatar-image.png"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map(drawerOption => (
                <ListItemLink 
                  key={drawerOption.path}
                  to={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box pb={2}>
            <ListItemButton onClick={toggleTheme}>
              <ListItemIcon>
                <Icon>dark_mode</Icon>
              </ListItemIcon>
              <ListItemText primary="Change theme" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <Icon>logout</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={ smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
