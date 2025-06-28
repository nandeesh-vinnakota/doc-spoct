import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
