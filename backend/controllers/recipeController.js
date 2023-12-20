const Recipe = require("../models/Recipe");
const fs = require("fs");

exports.getOneRecipe = (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then((recipe) => res.status(200).json(recipe))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllRecipes = (req, res, next) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createRecipe = (req, res, next) => {
  const recipeObject = req.body;
  delete recipeObject._id;

  // Parse arrays contained in formData field from JSON string to array
  recipeObject.ingredients = JSON.parse(recipeObject.ingredients);
  recipeObject.steps = JSON.parse(recipeObject.steps);
  console.log(recipeObject);

  const recipe = new Recipe({
    ...recipeObject,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  recipe
    .save()
    .then(() => {
      res.status(201).json({ message: "Recipe added!" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateRecipe = (req, res, next) => {
  console.log(req.body);
  const recipeId = req.params.id;
  const recipeObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Recipe.findOne({ _id: recipeId })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      Recipe.updateOne({ _id: recipeId }, { ...recipeObject, _id: recipeId })
        .then(() => {
          if (req.file) {
            const filename = recipe.image.split("/images/")[1];
            fs.unlink(`images/${filename}`, (err) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ error: "Error deleting image file" });
              }
            });
          }
          res.status(200).json({ message: "Recipe modified!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error modifying recipe" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error finding recipe" });
    });
};

exports.deleteRecipe = (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then((recipe) => {
      const filename = recipe.image.split("/images/")[1];
      Recipe.deleteOne({ _id: req.params.id })
        .then(() => {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              res.status(200).json({ message: "recipe deleted !" });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(401).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
