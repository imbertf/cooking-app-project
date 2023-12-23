const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  name: { type: String },
  category: { type: String },
  description: { type: String },
  cookingMethod: { type: String },
  ingredients: [
    {
      name: { type: String },
      quantity: { type: Number },
      unit: { type: String },
      image: { type: String },
    },
  ],
  steps: [{ description: { type: String } }],
  tools: [{ name: { type: String }, image: { type: String } }],
  image: { type: String },
});

module.exports = mongoose.model("Recipe", recipeSchema);
