import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts";
import { Sidebar } from "./shared/components";


export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>

        <Sidebar>
          <AppRoutes />
        </Sidebar>
    
      </BrowserRouter>
    </AppThemeProvider>
  );
};
