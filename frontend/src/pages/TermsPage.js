import React, { useState, useEffect } from "react";
import { Container, Divider, Typography, Stack } from "@mui/material";

import AlphabeticallyPaginationComponent from "../components/AlphabeticallyPaginationComponent";
import TermListComponent from "../components/TermsListComponent";

// const terms = [
//   {
//     name: "Abaisser",
//     description:
//       "Donner une certaine épaisseur à une pâte à l'aide d'un rouleau à pâtisserie ou d'un laminoir",
//   },
//   {
//     name: "Abricoter",
//     description:
//       "Etendre du nappage (sirop épais, coulis...) à l'aide d'un pinceau sur les fruits d'une tarte par exemple pour la rendre brillante",
//   },
//   {
//     name: "Braiser",
//     description:
//       "Cuire lentement au four dans une braisière et à court mouillement",
//   },
//   {
//     name: "Blanchir",
//     description:
//       "Plonger quelques minutes des légumes dans une eau bouillante salée dans le but de les cuisiner ensuite ou de les congeler",
//   },
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
// ];

const TermsPage = () => {
  const [getData, setGetData] = useState([]);

  const sections = {};

  // get data from DB
  useEffect(() => {
    fetch("http://localhost:3000/api/terms")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  // Sort the terms alphabetically
  getData.sort((a, b) => a.title.localeCompare(b.title));

  // Group the terms by sections
  getData.forEach((term) => {
    const section = term.title[0].toUpperCase(); // Extract the first letter and convert to uppercase to create ections
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
                name={term.title}
                description={term.description}
                key={index}
              />
            ))}
          </Stack>
        ))}
      </Container>
    </Container>
  );
};

export default TermsPage;
