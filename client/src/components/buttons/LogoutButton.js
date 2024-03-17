import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { IconButton } from "@mui/material";
import { RiLogoutCircleLine } from "react-icons/ri";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <IconButton color="error" size="medium" onClick={handleLogout}>
      <RiLogoutCircleLine />
    </IconButton>
  );
};
