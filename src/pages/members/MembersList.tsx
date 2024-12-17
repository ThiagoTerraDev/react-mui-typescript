import { useSearchParams } from "react-router-dom";
import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { useEffect, useMemo } from "react";
import { MembersService } from "../../shared/services/api/members/MembersService";
import { useDebounce } from "../../shared/hooks";


export const MembersList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (debouncedSearch) {
      MembersService.getAll(1, search)
        .then((result) => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            console.log(result);
          }
        });
    }
  }, [debouncedSearch]);

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
