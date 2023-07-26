const express = require("express");
const recipeRoutes = require("./recipeRoutes");

const app = express();

app.use("/recipes", recipeRoutes);

module.exports = app;
