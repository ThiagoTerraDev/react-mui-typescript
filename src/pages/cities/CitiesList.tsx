import { useSearchParams } from "react-router-dom";
import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";
import { useMemo } from "react";


export const CitiesList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = useMemo(() => {
    return searchParams.get("search") || "";
  }, [searchParams]);

  return (
    <BasePageLayout 
      title="List of Cities" 
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
