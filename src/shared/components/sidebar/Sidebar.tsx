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
  useTheme 
} from "@mui/material";


interface ISidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer variant="permanent">
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
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};