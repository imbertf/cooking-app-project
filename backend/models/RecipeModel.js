const mongoose = require("mongoose");
const recipeType = require("./RecipeTypeModel");
const image = require("./ImageModel");

const recipeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    recipeType: [recipeType],
    cookingMethod: {
      type: String,
      required: true,
      unique: true,
    },
    tools: [image],
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
        image: [image],
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
recipeSchema.index(
  { name: "text", description: "text" },
  { name: "text" },
  { ingredients: "text" },
  { cookingMethod: "text" },
  { recipeType: "text" }
);

module.exports = Recipe;
