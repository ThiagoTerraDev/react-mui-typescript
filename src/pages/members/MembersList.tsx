import { useSearchParams } from "react-router-dom";
import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { useEffect, useMemo } from "react";
import { MembersService } from "../../shared/services/api/members/MembersService";


export const MembersList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  useEffect(() => {
    MembersService.getAll(1, search)
      .then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
        }
      });
  }, [search]);

  return (
    <BasePageLayout 
      title="List of Members" 
      toolbar={
        <SearchToolbar 
          showTextField
          searchText={search}
          onChangeSearchText={newSearchText => setSearchParams({ search: newSearchText }, { replace: true })}
        />
      }>
    </BasePageLayout>
  );
};
