import * as React from "react";
import { Link } from "react-router-dom";

// material ui
import { Container, Divider, Typography, Stack } from "@mui/material";

// components
import AlphabeticallyPaginationComponent from "../../components/AlphabeticallyPaginationComponent";
import TermListComponent from "../../components/TermsListComponent";
import ActionButtonComponent from "../../components/ActionButtonComponent";

// material icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

// tools functions
const deleteHandler = () => {
  if (window.confirm("Êtes-vous sur de vouloir supprimer ce terme technique?")); // Alert user for deleting
};

// temporary backend
const terms = [
  {
    name: "Abaisser",
    description:
      "Donner une certaine épaisseur à une pâte à l'aide d'un rouleau à pâtisserie ou d'un laminoir",
  },
  {
    name: "Abricoter",
    description:
      "Etendre du nappage (sirop épais, coulis...) à l'aide d'un pinceau sur les fruits d'une tarte par exemple pour la rendre brillante",
  },
  {
    name: "Braiser",
    description:
      "Cuire lentement au four dans une braisière et à court mouillement",
  },
  {
    name: "Blanchir",
    description:
      "Plonger quelques minutes des légumes dans une eau bouillante salée dans le but de les cuisiner ensuite ou de les congeler",
  },
  {
    name: "Canneler",
    description:
      "Pratiquer de petites cannelures, à l'aide d'un couteau canneleur, à la surface de certains fruits pour améliorer leur présentation",
  },
  {
    name: "Chemiser",
    description:
      "Mettre une couche de beurre, de farine ou un papier sulfurisé ou un film alimentaire sur le fond et les parois intérieures d'un moule. Mais aussi des bardes de lard ou une crépine pour confectionner une terrine ou encore des biscuits à la cuillère pour réaliser une charlotte...",
  },
];

export default function AdminTermsPage() {
  const sections = {};

  // Sort the terms alphabetically
  terms.sort((a, b) => a.name.localeCompare(b.name));

  // Group the terms by sections
  terms.forEach((term) => {
    const section = term.name[0].toUpperCase(); // Extract the first letter and convert to uppercase to create ections
    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push(term);
  });

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
          Gestion des termes techniques
        </Typography>
        <Container
          sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
        >
          <AlphabeticallyPaginationComponent />
        </Container>
        <Divider />
        <Container sx={{ marginTop: "10px" }}>
          {Object.keys(sections).map((section) => (
            <Stack key={section}>
              <Typography color={"secondary"}>{section}</Typography>
              {sections[section].map((term, index) => (
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <TermListComponent
                    name={term.name}
                    description={term.description}
                    key={index}
                  />
                  <Stack direction={"row"} alignItems={"center"}>
                    <ActionButtonComponent
                      text={"Terme technique supprimé"}
                      severity={"info"}
                      Children={<DeleteIcon color="error" />}
                      toolTip={"Supprimer"}
                      clickAction={deleteHandler}
                    />
                    <Link to="/admin/edit-term">
                      <ActionButtonComponent
                        Children={<EditNoteOutlinedIcon color="info" />}
                        toolTip={"Editer"}
                      />
                    </Link>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          ))}
        </Container>
      </Stack>
    </Container>
  );
}
