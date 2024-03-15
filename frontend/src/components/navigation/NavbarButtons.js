import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { SignupButton } from "../buttons/SignupButton";
import { LogoutButton } from "../buttons/LogoutButton";
import { LoginButton } from "../buttons/LoginButton";
import { Box } from "@mui/material";

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </>
  );
};
