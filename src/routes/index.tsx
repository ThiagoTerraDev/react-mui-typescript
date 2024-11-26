import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {
  // const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/home",
        label: "Home"
      }
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>Toggle Theme</Button>} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
