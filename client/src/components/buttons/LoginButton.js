import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button, useTheme } from "@mui/material";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const theme = useTheme();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return (
    <Button
      variant="contained"
      sx={{ width: "100px", height: "30px", fontSize: "12px", color: "white" }}
      onClick={handleLogin}
    >
      Connexion
    </Button>
  );
};
