const Ingredient = require("../models/Ingredient");
const fs = require("fs");

exports.getOneIngredient = (req, res, next) => {
  Ingredient.findOne({ _id: req.params.id })
    .then((ingredient) => res.status(200).json(ingredient))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllIngredients = (req, res, next) => {
  Ingredient.find()
    .then((ingredients) => {
      res.status(200).json(ingredients);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.createIngredient = (req, res, next) => {
  const ingredientObject = req.body;
  delete ingredientObject._id;
  console.log(ingredientObject);

  const ingredient = new Ingredient({
    ...ingredientObject,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  ingredient
    .save()
    .then(() => {
      res.status(201).json({ message: "Ingredient added !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.updateIngredient = (req, res, next) => {
  console.log(req.body);
  const ingredientId = req.params.id;
  const ingredientObject = req.file
    ? {
        ...req.body,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Ingredient.findOne({ _id: ingredientId })
    .then((ingredient) => {
      if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
      }

      Ingredient.updateOne(
        { _id: ingredientId },
        { ...ingredientObject, _id: ingredientId }
      )
        .then(() => {
          if (req.file) {
            const filename = ingredient.image.split("/images/")[1];
            fs.unlink(`images/${filename}`, (err) => {
              if (err) {
                console.error(err);
                return res
                  .status(500)
                  .json({ error: "Error deleting image file" });
              }
            });
          }
          res.status(200).json({ message: "Ingredient modified!" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Error modifying ingredient" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error finding ingredient" });
    });
};

exports.deleteIngredient = (req, res, next) => {
  Ingredient.findOne({ _id: req.params.id })
    .then((ingredient) => {
      const filename = ingredient.image.split("/images/")[1];
      Ingredient.deleteOne({ _id: req.params.id })
        .then(() => {
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              res.status(200).json({ message: "ingredient deleted !" });
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
