const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
