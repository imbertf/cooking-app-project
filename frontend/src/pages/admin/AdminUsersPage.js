import React from "react";

// material ui
import { Container, Stack, Typography } from "@mui/material";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminUserCardComponent from "../../components/admin/AdminUserCardComponent";

// temporary backend
const users = [
  { name: "Morane", firstName: "Bob", mail: "contretout@chacal.com" },
  { name: "Pabong", firstName: "Chang", mail: "lesmysteresde@pekin.com" },
  { name: "Bouzouk", firstName: "Bachi", mail: "millemillion@sabord.com" },
  { name: "Bouzouk", firstName: "Bachi", mail: "millemillion@sabord.com" },
  { name: "Bouzouk", firstName: "Bachi", mail: "millemillion@sabord.com" },
  { name: "Bouzouk", firstName: "Bachi", mail: "millemillion@sabord.com" },
  { name: "Bouzouk", firstName: "Bachi", mail: "millemillion@sabord.com" },
];

const AdminUsersPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
    >
      <AdminLinksComponent />
      <Stack direction={"column"}>
        <Typography
          component="h1"
          variant="h4"
          textAlign={{ xs: "center", sm: "inherit" }}
          mx={"10px"}
        >
          Gestion des utilisateurs
        </Typography>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={{ xs: "center", sm: "inherit" }}
        >
          {users.map((user, index) => {
            return (
              <AdminUserCardComponent
                ID={`user_${index}`}
                name={user.name}
                firstName={user.firstName}
                mail={user.mail}
                key={index}
              />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};

export default AdminUsersPage;
