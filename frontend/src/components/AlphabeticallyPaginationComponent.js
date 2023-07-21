import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

const AlphabeticallyPaginationComponent = () => {
  const alphabet = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  return (
    <Pagination
      size="small"
      showFirstButton
      showLastButton
      count={alphabet.length}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem {...item} page={alphabet[item.page - 1]} />
      )}
    />
  );
};

export default AlphabeticallyPaginationComponent;
