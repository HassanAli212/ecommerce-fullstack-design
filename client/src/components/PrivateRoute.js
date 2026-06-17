import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protect any route that needs login
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="spinner-wrapper"><div className="spinner-border text-primary"></div></div>;
  return user ? children : <Navigate to="/login" />;
};

// Protect admin-only routes
export const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="spinner-wrapper"><div className="spinner-border text-primary"></div></div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
};
