import React from "react";
import TagComponent from "./TagComponent";

const cookingMethods = [
  { grillé: "error" },
  { poché: "info" },
  { rôti: "success" },
  { sauté: "primary" },
  { émulsionné: "info" },
];

const CookingMethodTagComponent = ({ cookingMethod }) => {
  for (let method of cookingMethods) {
    const key = Object.keys(method);
    const value = Object.values(method).toString();

    if (cookingMethod == key) {
      return <TagComponent label={cookingMethod} color={value} />;
    }
  }
};

export default CookingMethodTagComponent;
