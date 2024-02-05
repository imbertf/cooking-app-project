import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/user",
      },
    });
  };

  return (
    <Button
      variant="contained"
      color="info"
      sx={{ width: "100px", height: "30px" }}
      onClick={handleLogin}
    >
      Connexion
    </Button>
  );
};
