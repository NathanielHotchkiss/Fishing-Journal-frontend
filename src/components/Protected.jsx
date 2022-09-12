import React from "react";
import { Navigate } from "react-router-dom";

import TokenService from "../services/token-service";

const Protected = ({ children }) => {
  function hasJWT() {
    if (TokenService.hasAuthToken()) {
      return true;
    } else {
      return false;
    }
  }
  if (!hasJWT()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default Protected;
