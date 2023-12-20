const express = require("express");
const router = express.Router();
const ingredientCtrl = require("../controllers/ingredientController");
const multer = require("../middlewares/multer-config");

router.get("/", ingredientCtrl.getAllIngredients);
router.get("/:id", ingredientCtrl.getOneIngredient);
router.post("/", multer, ingredientCtrl.createIngredient);
router.put("/:id", multer, ingredientCtrl.updateIngredient);
router.delete("/:id", ingredientCtrl.deleteIngredient);

module.exports = router;
