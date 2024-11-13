import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Button variant="contained" color="primary">Test</Button>} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  )
};
