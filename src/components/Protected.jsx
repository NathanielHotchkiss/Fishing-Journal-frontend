import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import TokenService from "../services/token-service";

const Protected = () => {
  function hasJWT() {
    if (TokenService.hasAuthToken()) {
      return true;
    } else {
      return false;
    }
  }

  if (!hasJWT()) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default Protected;
