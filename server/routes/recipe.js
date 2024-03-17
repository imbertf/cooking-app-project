const express = require("express");
const router = express.Router();
const recipeCtrl = require("../controllers/recipeController");
const multer = require("../middlewares/multer-config");

router.get("/", recipeCtrl.getAllRecipes);
router.get("/:id", recipeCtrl.getOneRecipe);
router.post("/", multer, recipeCtrl.createRecipe);
router.put("/:id", multer, recipeCtrl.updateRecipe);
router.delete("/:id", recipeCtrl.deleteRecipe);

module.exports = router;
