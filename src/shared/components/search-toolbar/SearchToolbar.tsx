import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";


interface ISearchToolbarProps {
  searchText?: string;
  showTextField?: boolean;
  onChangeSearchText?: (newSearchText: string) => void;
  newButtonText?: string;
  showNewButton?: boolean;
  onClickNewButton?: () => void;
}

export const SearchToolbar: React.FC<ISearchToolbarProps> = ({ 
  searchText = "", 
  showTextField = false, 
  onChangeSearchText,
  newButtonText = "New",
  showNewButton = true,
  onClickNewButton
}) => {

  const theme = useTheme();

  return (
    <Box 
      component={Paper}
      height={theme.spacing(5)} 
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      gap={1}
    >
      {showTextField && 
        <TextField 
          size="small" 
          placeholder="Search..."
          value={searchText}
          onChange={(e) => onChangeSearchText?.(e.target.value)} 
        />
      }

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton &&
          <Button 
            variant="contained" 
            color="primary" 
            disableElevation
            endIcon={<Icon>add</Icon>}
            onClick={onClickNewButton}
          >
            {newButtonText}
          </Button>
        }
      </Box>
    </Box>
  );
};
