import { useNavigate, useParams } from "react-router-dom";
import { BasePageLayout } from "../../shared/layouts";
import { DetailsToolbar } from "../../shared/components";
import { useEffect, useState } from "react";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { Box, Grid2, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const cityValidationSchema = z.object({
  name: z.string().nonempty("City name is required"),
});

type cityValidationSchema = z.infer<typeof cityValidationSchema>;

export const CitiesDetails: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<cityValidationSchema>({
    resolver: zodResolver(cityValidationSchema),
    defaultValues: {
      name: "",
    }
  });

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);

      CitiesService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate("/cities");
          } else {
            setCityName(result.name);
            reset(result);
          }
        });
    } else {
      reset({
        name: "",
      });
    }
  }, [id]);

  const handleSave = (data: cityValidationSchema, goBack: boolean) => {
    setIsLoading(true);

    if (id === "new") {
      CitiesService.create(data)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("City created successfully");
            if (goBack) {
              navigate("/cities");
            } else {
              navigate(`/cities/details/${result}`);
            }
          }
        });
    } else {
      CitiesService.updateById(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("City updated successfully");
            if (goBack) {
              navigate("/cities");
            } else {
              setCityName(data.name);
            }
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      CitiesService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("City deleted successfully");
            navigate("/cities");
          }
        });
    }
  };

  return (
    <BasePageLayout 
      title={id === "new" ? "New city" : cityName}
      toolbar={
        <DetailsToolbar 
          showSaveAndBackButton
          showDeleteButton={id !== "new"}
          showNewButton={id !== "new"}
          onClickBackButton={() => navigate("/cities")}
          onClickNewButton={() => navigate("/cities/details/new")}
          onClickSaveButton={handleSubmit((data) => handleSave(data, false))}
          onClickDeleteButton={() => handleDelete(Number(id))}
          onClickSaveAndBackButton={handleSubmit((data) => handleSave(data, true))}
        />
      }
    >

      <form>
        <Box 
          margin={1} 
          display="flex" 
          flexDirection="column" 
          component={Paper}
          variant="outlined"
        >
          <Grid2 container direction="column" padding={2} spacing={2}>
            
            {isLoading && (
              <Grid2>
                <LinearProgress variant="indeterminate"/>
              </Grid2>
            )}
            
            <Grid2 mb={1}>
              <Typography variant="h6">
                City Details
              </Typography>
            </Grid2>

            <Grid2 container direction="row">
              <Grid2 size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
                <TextField
                  fullWidth 
                  slotProps={{
                    inputLabel: { shrink: true },
                    formHelperText: {
                      sx: {
                        maxHeight: "20px",
                      },
                    }}}
                  label="name" 
                  {...register("name")} 
                  disabled={isLoading}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </form>
    </BasePageLayout>
  );
};
