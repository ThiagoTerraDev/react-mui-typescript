import { Box, Paper, Button, useTheme, Icon, Divider, Skeleton } from "@mui/material";


interface IDetailsToolbarProps {
  newButtonText?: string;
  showNewButton?: boolean;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  showBackButton?: boolean;
  showSaveAndBackButton?: boolean;

  newButtonBusy?: boolean;
  saveButtonBusy?: boolean;
  deleteButtonBusy?: boolean;
  backButtonBusy?: boolean;
  saveAndBackButtonBusy?: boolean;

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

  newButtonBusy = false,
  saveButtonBusy = false,
  deleteButtonBusy = false,
  backButtonBusy = false,
  saveAndBackButtonBusy = false,

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
      {(showSaveButton && !saveButtonBusy) && (
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

      {saveButtonBusy && (
        <Skeleton width={100} height={60}/>
      )}

      {(showSaveAndBackButton && !saveAndBackButtonBusy) && (
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

      {saveAndBackButtonBusy && (
        <Skeleton width={170} height={60}/>
      )}

      {(showDeleteButton && !deleteButtonBusy) && (
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

      {deleteButtonBusy && (
        <Skeleton width={115} height={60}/>
      )}

      {(showNewButton && !newButtonBusy) && (
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

      {newButtonBusy && (
        <Skeleton width={100} height={60}/>
      )}

      <Divider variant="middle" orientation="vertical" />

      {(showBackButton && !backButtonBusy) && (
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

      {backButtonBusy && (
        <Skeleton width={100} height={60}/>
      )}
    </Box>
  );
};
