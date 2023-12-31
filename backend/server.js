// environnement
require("dotenv").config();

// express
const express = require("express");
const app = express();

// mongodb connection
const connectDB = require("./config/db");
connectDB();

// JSON management
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// CORS management
const cors = require("cors");
app.use(cors());

// routes
/////////////
// Trying to find solution to create secured separated routes for admin and users
const userRoutes = require("./routes/user");
app.use("/api/auth", userRoutes);
/////////////

const recipeRoutes = require("./routes/recipe");
app.use("/api/recipes", recipeRoutes);
const ingredientRoutes = require("./routes/ingredient");
app.use("/api/ingredients", ingredientRoutes);
const termRoutes = require("./routes/term");
app.use("/api/terms", termRoutes);
const noteRoutes = require("./routes/note");
app.use("/api/notes", noteRoutes);

// Image management
const path = require("path");
const multer = require("./middlewares/multer-config");
app.use("/images", express.static(path.join(__dirname, "images")));

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  next(error);
});
app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
});

// port config
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
