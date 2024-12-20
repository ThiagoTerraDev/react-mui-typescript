import { useNavigate, useParams } from "react-router-dom";
import { BasePageLayout } from "../../shared/layouts";
import { DetailsToolbar } from "../../shared/components";
import { useEffect, useState } from "react";
import { MembersService } from "../../shared/services/api/members/MembersService";
import { LinearProgress } from "@mui/material";


export const MembersDetails: React.FC = () => {
  const { id = "new" } = useParams<"id">();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [memberFullName, setMemberFullName] = useState("");

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
            console.log(result);
          }
        });
    }
  }, []);

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
          // onClickSaveButton={handleSave}
          onClickDeleteButton={() => handleDelete(Number(id))}
          // onClickSaveAndBackButton={handleSaveAndBack}
        />
      }
    >
      {isLoading && (
        <LinearProgress variant="indeterminate"/>
      )}

      Details
    </BasePageLayout>
  );
};
