import { SearchToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";


export const Dashboard = () => {
  return (
    <BasePageLayout 
      title="Home" 
      toolbar={(
        <SearchToolbar 
          showTextField
        />
      )}
    >
      Testing
    </BasePageLayout>
  );
};
