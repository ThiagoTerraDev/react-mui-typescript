import { 
  Box, 
  Paper, 
  Button, 
  useTheme, 
  Icon, 
  Divider, 
  Skeleton, 
  Typography, 
  useMediaQuery 
} from "@mui/material";


interface IDetailsToolbarProps {
  newButtonText?: string;
  showNewButton?: boolean;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  showBackButton?: boolean;
  showSaveAndCloseButton?: boolean;

  newButtonBusy?: boolean;
  saveButtonBusy?: boolean;
  deleteButtonBusy?: boolean;
  backButtonBusy?: boolean;
  saveAndCloseButtonBusy?: boolean;

  onClickNewButton?: () => void;
  onClickSaveButton?: () => void;
  onClickDeleteButton?: () => void;
  onClickBackButton?: () => void;
  onClickSaveAndCloseButton?: () => void;
}

export const DetailsToolbar: React.FC<IDetailsToolbarProps> = ({ 
  newButtonText = "New",

  showNewButton = true,
  showSaveButton = true,
  showDeleteButton = true,
  showBackButton = true,
  showSaveAndCloseButton = false,

  newButtonBusy = false,
  saveButtonBusy = false,
  deleteButtonBusy = false,
  backButtonBusy = false,
  saveAndCloseButtonBusy = false,

  onClickNewButton,
  onClickSaveButton,
  onClickDeleteButton,
  onClickBackButton,
  onClickSaveAndCloseButton
}) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

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
          <Typography 
            variant="button"
            whiteSpace="nowrap" 
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Save
          </Typography>
        </Button>
      )}

      {saveButtonBusy && (
        <Skeleton width={100} height={60}/>
      )}

      {(showSaveAndCloseButton && !saveAndCloseButtonBusy && !mdDown) && (
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={onClickSaveAndCloseButton}
        >
          <Typography 
            variant="button"
            whiteSpace="nowrap" 
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Save and close
          </Typography>
        </Button>
      )}

      {(saveAndCloseButtonBusy && !mdDown) && (
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
          <Typography 
            variant="button"
            whiteSpace="nowrap" 
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Delete
          </Typography>
        </Button>
      )}

      {deleteButtonBusy && (
        <Skeleton width={115} height={60}/>
      )}

      {(showNewButton && !newButtonBusy && !smDown) && (
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={onClickNewButton}
        >
          <Typography 
            variant="button"
            whiteSpace="nowrap" 
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {newButtonText}
          </Typography>
        </Button>
      )}

      {(newButtonBusy && !smDown) && (
        <Skeleton width={100} height={60}/>
      )}

      {(showBackButton && (
        showSaveButton || 
        showSaveAndCloseButton || 
        showDeleteButton || 
        showNewButton )) && (
        <Divider variant="middle" orientation="vertical" />
      )}

      {(showBackButton && !backButtonBusy) && (
        <Button 
          variant="outlined" 
          color="primary" 
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={onClickBackButton}
        >
          <Typography 
            variant="button"
            whiteSpace="nowrap" 
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Back
          </Typography>
        </Button>
      )}

      {backButtonBusy && (
        <Skeleton width={100} height={60}/>
      )}
    </Box>
  );
};
