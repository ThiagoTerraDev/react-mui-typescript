import { useNavigate, useParams } from "react-router-dom";
import { BasePageLayout } from "../../shared/layouts";
import { DetailsToolbar } from "../../shared/components";
import { useEffect, useState } from "react";
import { CitiesService } from "../../shared/services/api/cities/CitiesService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomForm } from "../../shared/forms";


const cityValidationSchema = z.object({
  name: z.string().nonempty("City name is required"),
});

type CityValidationSchema = z.infer<typeof cityValidationSchema>;

export const CitiesDetails: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CityValidationSchema>({
    resolver: zodResolver(cityValidationSchema),
    defaultValues: {
      name: "",
    }
  });

  const fields = [
    {
      name: "name",
      label: "City name",
      type: "text",
    }
  ];

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

  const handleSave = (data: CityValidationSchema, goBack: boolean) => {
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
          showSaveAndCloseButton
          showDeleteButton={id !== "new"}
          showNewButton={id !== "new"}
          onClickBackButton={() => navigate("/cities")}
          onClickNewButton={() => navigate("/cities/details/new")}
          onClickSaveButton={handleSubmit((data) => handleSave(data, false))}
          onClickDeleteButton={() => handleDelete(Number(id))}
          onClickSaveAndCloseButton={handleSubmit((data) => handleSave(data, true))}
        />
      }
    >

      <CustomForm<CityValidationSchema>
        isLoading={isLoading}
        pageTitle="City details"
        fields={fields}
        register={register}
        errors={errors}
      />
    </BasePageLayout>
  );
};
