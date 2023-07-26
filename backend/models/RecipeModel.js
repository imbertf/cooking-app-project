const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
});

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    recipeType: {
      type: String,
      required: true,
    },
    cookingMethod: {
      type: String,
    },
    tools: [imageSchema],
    ingredients: [
      {
        name: { type: String },
        unit: {
          type: String,
          enum: [
            "pièce",
            "pièces",
            "kg",
            "g",
            "mg",
            "l",
            "cl",
            "ml",
            "feuille",
            "feuilles",
            "c à c",
            "c à s",
            "pincée",
            "pincées",
            "branche",
            "branches",
            "botte",
            "bottes",
          ],
        },
        quantity: { type: Number },
        image: [imageSchema],
      },
    ],
    steps: [{ step: { type: String, required: true } }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
