import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";


interface IBasePageLayoutProps {
  children?: React.ReactNode;
  title: string;
  toolbar?: React.ReactNode;
}

export const BasePageLayout: React.FC<IBasePageLayoutProps> = ({ children, title, toolbar }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap="1">
      <Box 
        padding={1} 
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} 
        display="flex" 
        alignItems="center" gap="1">

        {smDown &&
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        }

        <Typography 
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"} 
          whiteSpace="nowrap" 
          overflow="hidden" 
          textOverflow="ellipses">
          {title}
        </Typography>
      </Box>

      {toolbar &&
        <Typography>
          {toolbar}
        </Typography>
      }

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
