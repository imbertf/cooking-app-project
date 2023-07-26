const mongoose = require("mongoose");
const recipeSchema = mongoose.Schema;
({
  name: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
