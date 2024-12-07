import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { CitiesList, Dashboard } from "../pages";

export const AppRoutes = () => {
  // const { toggleTheme } = useAppThemeContext();
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home"
      },
      {
        icon: "location_city",
        path: "/cities",
        label: "Cities"
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/cities" element={<CitiesList />} />
      {/* <Route path="/cities/details/:id" element={<Dashboard />} /> */}

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
