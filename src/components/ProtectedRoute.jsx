import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUserState } from '../state/user'

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = getUserState().loggedIn;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;