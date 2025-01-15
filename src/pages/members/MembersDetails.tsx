import { useNavigate, useParams } from "react-router-dom";
import { BasePageLayout } from "../../shared/layouts";
import { DetailsToolbar } from "../../shared/components";
import { useEffect, useState } from "react";
import { MembersService } from "../../shared/services/api/members/MembersService";
import { Box, Grid2, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const memberValidationSchema = z.object({
  fullName: z.string().nonempty("Fullname is required"),
  email: z.string().email("Please enter a valid email"),
  cityId: z.preprocess((value) => Number(value), z.number().min(1, "CityId must be greater than 0")),
});

type MemberValidationSchema = z.infer<typeof memberValidationSchema>;

export const MembersDetails: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [memberFullName, setMemberFullName] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MemberValidationSchema>({
    resolver: zodResolver(memberValidationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cityId: undefined,
    }
  });

  useEffect(() => {
    if (id !== "new") {
      setIsLoading(true);

      MembersService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate("/members");
          } else {
            setMemberFullName(result.fullName);
            reset(result);
          }
        });
    } else {
      reset({
        fullName: "",
        email: "",
        cityId: 0,
      });
    }
  }, [id]);

  const handleSave = (data: MemberValidationSchema, goBack: boolean) => {
    setIsLoading(true);

    if (id === "new") {
      MembersService.create(data)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Member created successfully");
            if (goBack) {
              navigate("/members");
            } else {
              navigate(`/members/details/${result}`);
            }
          }
        });
    } else {
      MembersService.updateById(Number(id), { id: Number(id), ...data })
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Member updated successfully");
            if (goBack) {
              navigate("/members");
            } else {
              setMemberFullName(data.fullName);
            }
          }
        });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      MembersService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert("Member deleted successfully");
            navigate("/members");
          }
        });
    }
  };

  return (
    <BasePageLayout 
      title={id === "new" ? "New Member" : memberFullName}
      toolbar={
        <DetailsToolbar 
          showSaveAndBackButton
          showDeleteButton={id !== "new"}
          showNewButton={id !== "new"}
          onClickBackButton={() => navigate("/members")}
          onClickNewButton={() => navigate("/members/details/new")}
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
                Member Details
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
                  label="Fullname" 
                  {...register("fullName")} 
                  disabled={isLoading}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              </Grid2>
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
                  label="Email" 
                  {...register("email")}
                  disabled={isLoading}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid2>
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
                  label="CityId" 
                  {...register("cityId")}
                  disabled={isLoading}
                  error={!!errors.cityId}
                  helperText={errors.cityId?.message}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </form>
    </BasePageLayout>
  );
};
