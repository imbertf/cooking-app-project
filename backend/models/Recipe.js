const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: { type: String },
  category: { type: String },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Recipe", recipeSchema);
