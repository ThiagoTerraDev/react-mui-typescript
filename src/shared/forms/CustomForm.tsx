import { 
  Box, 
  Grid2, 
  LinearProgress, 
  Paper, 
  Typography,
  TextField,
} from "@mui/material";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";


interface IFormField {
  name: string;
  label: string;
  type?: string;
}

interface ICustomFormProps<T extends FieldValues> {
  isLoading: boolean;
  pageTitle: string;
  fields: IFormField[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  renderCustomField?: (field: IFormField) => React.ReactNode;
}

export const CustomForm = <T extends FieldValues> ({
  isLoading,
  pageTitle,
  fields,
  register,
  errors,
  renderCustomField,
}: ICustomFormProps<T>) => {
  return (
    <Box
      margin={1} 
      display="flex" 
      flexDirection="column" 
      component={Paper}
      variant="outlined"
    >

      <Grid2 container direction="column" padding={2} spacing={2}>
        <Grid2>
          {isLoading && (
            <Grid2>
              <LinearProgress variant="indeterminate"/>
            </Grid2>
          )}
            
          <Grid2 pb={3}>
            <Typography variant="h6">
              {pageTitle}
            </Typography>
          </Grid2>

          {fields.map((field) => (
            <Grid2 key={field.name} container direction="row">
              <Grid2 size={{ xs: 12, md: 6, lg: 4, xl: 3 }} pb={2.5}>
                {renderCustomField && field.type === "custom" ? (
                  renderCustomField(field)
                ) : (
                  <TextField 
                    fullWidth
                    slotProps={{
                      inputLabel: { shrink: true },
                      formHelperText: {
                        sx: {
                          maxHeight: "20px",
                        },
                      },
                    }}
                    label={field.label}
                    type={field.type || "text"}
                    disabled={isLoading}
                    error={!!errors[field.name as keyof T]}
                    helperText={errors[field.name as keyof T]?.message as string}
                    {...register(field.name as Path<T>)}
                  />
                )}
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  );
};

