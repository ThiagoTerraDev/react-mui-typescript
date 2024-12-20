import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import { CitiesList, Dashboard, MembersDetails, MembersList } from "../pages";

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
      },
      {
        icon: "people",
        path: "/members",
        label: "Members"
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/cities" element={<CitiesList />} />
      <Route path="/members" element={<MembersList />} />
      <Route path="/members/details/:id" element={<MembersDetails />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
