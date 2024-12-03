import { Box, Paper, Button, useTheme, Icon, Divider } from "@mui/material";


interface IDetailsToolbarProps {
  newButtonText?: string;
  showNewButton?: boolean;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  showBackButton?: boolean;
  showSaveAndBackButton?: boolean;
  onClickNewButton?: () => void;
  onClickSaveButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickBackButton?: () => void;
  onClickSaveAndBackButton?: () => void;
}

export const DetailsToolbar: React.FC<IDetailsToolbarProps> = ({ 
  newButtonText = "New",
  showNewButton = true,
  showSaveButton = true,
  showDeleteButton = true,
  showBackButton = true,
  showSaveAndBackButton = false,
  onClickNewButton,
  onClickSaveButton,
  onClickDeleteButton,
  onClickBackButton,
  onClickSaveAndBackButton
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
      {showSaveButton && (
        <Button 
          variant="contained" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveButton}
        >
          Save
        </Button>
      )}

      {showSaveAndBackButton && (
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndBackButton}
        >
          Save and back
        </Button>
      )}

      {showDeleteButton && (
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={onClickDeleteButton}
        >
          Delete
        </Button>
      )}

      {showNewButton && (
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNewButton}
        >
          {newButtonText}
        </Button>
      )}

      <Divider variant="middle" orientation="vertical" />

      {showBackButton &&(
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBackButton}
        >
          Back
        </Button>
      )}
    </Box>
  );
};
