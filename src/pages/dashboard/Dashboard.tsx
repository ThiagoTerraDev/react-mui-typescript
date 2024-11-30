import { Toolbar } from "../../shared/components";
import { BasePageLayout } from "../../shared/layouts";


export const Dashboard = () => {
  return (
    <BasePageLayout 
      title="Home" 
      toolbar={(
        <Toolbar 
          showTextField
        />
      )}
    >
      Testing
    </BasePageLayout>
  );
};
