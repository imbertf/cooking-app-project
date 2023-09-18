const mongoose = require("mongoose");

const RecipeTypeSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const RecipeType = mongoose.model("Category", RecipeTypeSchema);
module.exports = RecipeType;
