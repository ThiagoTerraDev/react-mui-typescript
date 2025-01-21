import { DetailsToolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";


export const Dashboard = () => {
  return (
    <BasePageLayout 
      title="Home" 
      toolbar={(
        <DetailsToolbar 
          showSaveAndCloseButton
        />
      )}
    >
      Testing
    </BasePageLayout>
  );
};
