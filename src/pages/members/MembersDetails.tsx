import { useNavigate, useParams } from "react-router-dom";
import { BasePageLayout } from "../../shared/layouts";
import { DetailsToolbar } from "../../shared/components";
import { useEffect, useState } from "react";
import { MembersService } from "../../shared/services/api/members/MembersService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CityAutoComplete } from "./components/CityAutoComplete";
import { CustomForm } from "../../shared/forms";


const memberValidationSchema = z.object({
  fullName: z.string().nonempty("Fullname is required"),
  email: z.string().email("Please enter a valid email"),
  cityId: z.number().min(1, "Please select a city"),
});

type MemberValidationSchema = z.infer<typeof memberValidationSchema>;

export const MembersDetails: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [memberFullName, setMemberFullName] = useState("");
  const [registeredMemberCityId, setRegisteredMemberCityId] = useState<number | undefined>(undefined);

  const { setValue, register, handleSubmit, reset, formState: { errors } } = useForm<MemberValidationSchema>({
    resolver: zodResolver(memberValidationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cityId: undefined,
    }
  });

  const fields = [
    {
      name: "fullName",
      label: "Fullname",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "cityId",
      label: "City",
      type: "custom",
    }
  ];

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
            setRegisteredMemberCityId(result.cityId);
          }
        });
    } else {
      reset({
        fullName: "",
        email: "",
        cityId: 0,
      });
      setRegisteredMemberCityId(undefined);
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
              setRegisteredMemberCityId(data.cityId);
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
          showSaveAndCloseButton
          showDeleteButton={id !== "new"}
          showNewButton={id !== "new"}
          onClickBackButton={() => navigate("/members")}
          onClickNewButton={() => navigate("/members/details/new")}
          onClickSaveButton={handleSubmit((data) => handleSave(data, false))}
          onClickDeleteButton={() => handleDelete(Number(id))}
          onClickSaveAndCloseButton={handleSubmit((data) => handleSave(data, true))}
        />
      }
    >
      <CustomForm<MemberValidationSchema>
        isLoading={isLoading}
        pageTitle="Member details"
        fields={fields}
        register={register}
        errors={errors}
        renderCustomField={(field) => 
          field.name === "cityId" ? (
            <CityAutoComplete 
              isExternalLoading={isLoading} 
              onCitySelected={cityId => setValue("cityId", cityId)}
              registeredMemberCityId={registeredMemberCityId}
              error={!!errors.cityId}
              helperText={errors.cityId?.message}
            />
          ) : null 
        }
      />
    </BasePageLayout>
  );
};
