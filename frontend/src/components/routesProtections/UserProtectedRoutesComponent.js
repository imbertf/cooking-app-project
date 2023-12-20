import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutesComponent = ({ userLogStatus }) => {
  let auth = true;

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutesComponent;
