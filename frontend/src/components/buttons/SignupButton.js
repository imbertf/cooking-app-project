import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button
      variant="contained"
      color="info"
      size="small"
      onClick={handleSignUp}
      sx={{ width: "100px", height: "30px" }}
    >
      S'enregistrer
    </Button>
  );
};
