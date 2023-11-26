import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { authContext } from '../../contexts/authContext';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ( {Component} ) => {
  const { authState: { authLoading, isAuthenticated } } = useContext(authContext);

  if (authLoading) {
    return (
      <Spinner animation='border' variant='info' />
    );
  }

  return (
    isAuthenticated ? (
        <Component />
      ) : (
        <Navigate to="/sign-in" />
    )
  );
};

export default ProtectedRoute;