import React, { useState } from "react";
import { IconButton, styled } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const FavoriteButton = styled(({ isFavorite, ...other }) => (
  <IconButton {...other} />
))(({ theme, isFavorite }) => ({
  padding: 0,
  color: isFavorite ? theme.palette.error.main : "inherit",
  "&:hover": {
    color: theme.palette.error.main,
  },
}));

const FavoriteHeart = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <FavoriteButton
      isFavorite={isFavorite}
      onClick={handleFavoriteClick}
      aria-label="Favorite"
    >
      {isFavorite ? (
        <FavoriteIcon fontSize="medium" />
      ) : (
        <FavoriteBorderIcon fontSize="medium" />
      )}
    </FavoriteButton>
  );
};

export default FavoriteHeart;
