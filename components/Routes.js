// components/ProtectedRoute.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return user ? <Component {...rest} /> : <LoginScreen />;
};

export default ProtectedRoute;