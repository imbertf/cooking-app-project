import React from "react";
import TagComponent from "./TagComponent";

const CookingMethodTagComponent = ({ cookingMethod }) => {
  switch (cookingMethod) {
    case "braisée":
      return <TagComponent label={cookingMethod} color={"error"} />;

    case "poché":
      return <TagComponent label={cookingMethod} color={"info"} />;

    case "grillé":
      return <TagComponent label={cookingMethod} color={"error"} />;
    case "sauté":
      return <TagComponent label={cookingMethod} color={"primary"} />;

    case "émulsionné":
      return <TagComponent label={cookingMethod} color={"yellow"} />;

    case "rôti":
      return <TagComponent label={cookingMethod} color={"darkred"} />;

    default:
      break;
  }
};

export default CookingMethodTagComponent;
