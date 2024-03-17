import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

const AlphabeticallyPaginationComponent = ({ sendPage }) => {
  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  const handlePage = (page) => {
    const pageToSend = page;
    sendPage(pageToSend);
  };

  return (
    <Pagination
      color="primary"
      size="small"
      showFirstButton
      showLastButton
      count={alphabet.length}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem {...item} page={alphabet[item.page - 1]} />
      )}
      onChange={(event, page) => handlePage(alphabet[page - 1])}
    />
  );
};

export default AlphabeticallyPaginationComponent;
