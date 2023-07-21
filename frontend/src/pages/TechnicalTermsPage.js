import * as React from "react";
import { Container, Divider, Typography, Stack } from "@mui/material";

import AlphabeticallyPaginationComponent from "../components/AlphabeticallyPaginationComponent";
import TermListComponent from "../components/TermsListComponent";

// const termsA = [
//   {
//     name: "Abaisser",
//     description:
//       "Donner une certaine épaisseur à une pâte à l'aide d'un rouleau à pâtisserie ou d'un laminoir",
//   },
//   {
//   name: "Abricoter",
//   description:
//     "Etendre du nappage (sirop épais, coulis...) à l'aide d'un pinceau sur les fruits d'une tarte par exemple pour la rendre brillante",
// },
//   {
//     name: "Anglaise",
//     description:
//       "Mélange d'oeufs battus, de sel et poivre, éventuellement d'un peu d'eau, d'un filet d'huile, servant à paner des aliments",
//   },
// ];
// const termsB = [
// {
//   name: "Braiser",
//   description:
//     "Cuire lentement au four dans une braisière et à court mouillement",
// },
//   {
//   name: "Blanchir",
//   description:
//     "Plonger quelques minutes des légumes dans une eau bouillante salée dans le but de les cuisiner ensuite ou de les congeler",
// },
//   {
//     name: "Blanchir",
//     description:
//       "Travailler au fouet des oeufs avec du sucre jusqu'a obtention d'un mélange blanc et mousseux",
//   },
// ];

// const termsC = [
//   {
//     name: "Canneler",
//     description:
//       "Pratiquer de petites cannelures, à l'aide d'un couteau canneleur, à la surface de certains fruits pour améliorer leur présentation",
//   },
//   {
//     name: "Chemiser",
//     description:
//       "Mettre une couche de beurre, de farine ou un papier sulfurisé ou un film alimentaire sur le fond et les parois intérieures d'un moule. Mais aussi des bardes de lard ou une crépine pour confectionner une terrine ou encore des biscuits à la cuillère pour réaliser une charlotte...",
//   },
//   {
//     name: "Confire",
//     description:
//       "Cuire longtemps et conserver un aliment dans sa propre graisse (porc, oie, canard)",
//   },
// ];

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

export default function TechnicalTermsPage() {
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
    <Container maxWidth="lg">
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
              <TermListComponent
                name={term.name}
                description={term.description}
                key={index}
              />
            ))}
          </Stack>
        ))}
      </Container>
    </Container>
  );
}
