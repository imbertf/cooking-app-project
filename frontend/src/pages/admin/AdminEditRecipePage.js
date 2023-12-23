// react
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// component
import SnackBarComponent from "../../components/SnackBarComponent";

// material ui
import {
  Box,
  Button,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  ListItem,
  List,
  ListItemText,
  Stack,
  Zoom,
} from "@mui/material";

// material icons
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminEditRecipePage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const valuesToUpdate = JSON.parse(localStorage.getItem("valuesToUpdate"));
  const [getData, setGetData] = useState([]);
  const [updatedRecipe, setUpdatedRecipe] = useState(valuesToUpdate);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientValues, setIngredientValues] = useState({
    name: "",
    quantity: 0,
    unit: "",
  });
  const [steps, setSteps] = useState([]);
  const [stepValue, setStepValue] = useState({
    description: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  // get ingrédients from DB to display them in option selection
  useEffect(() => {
    fetch("http://localhost:3000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
      });
  }, []);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", updatedRecipe.name);
    formDataToSend.append("category", updatedRecipe.category);
    formDataToSend.append("description", updatedRecipe.description);
    formDataToSend.append("cookingMethod", updatedRecipe.cookingMethod);
    formDataToSend.append(
      "ingredients",
      JSON.stringify(updatedRecipe.ingredients)
    );
    formDataToSend.append("steps", JSON.stringify(updatedRecipe.steps));
    formDataToSend.append("image", updatedRecipe.image);

    try {
      const res = await fetch(
        `http://localhost:3000/api/recipes/${updatedRecipe._id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );
      if (res.ok) {
        setShowAlert(!showAlert);
        localStorage.clear();
      } else {
        console.log("Erreur lors de la mise à jour de la recette");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate("/admin/recipes");
      }, 1500);
    }
  };

  const handleDelete = (index, type) => {
    let updatedList = [];

    if (type === "ingredient") {
      updatedList = [...updatedRecipe.ingredients];
      updatedList.splice(index, 1);
      setUpdatedRecipe({
        ...updatedRecipe,
        ingredients: updatedList,
      });
    } else if (type === "step") {
      updatedList = [...updatedRecipe.steps];
      updatedList.splice(index, 1);
      setUpdatedRecipe({
        ...updatedRecipe,
        steps: updatedList,
      });
    }
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRecipe({ ...updatedRecipe, [name]: value });
  };

  // change image into [currentValues] state
  const handleUpdateImage = (event) => {
    const file = event.target.files[0];
    setUpdatedRecipe({ ...updatedRecipe, image: file });
  };

  const handleIngredientChange = (event) => {
    const { name, value } = event.target;
    setIngredientValues({
      ...ingredientValues,
      [name]: value,
    });
  };

  const handleStepChange = (event) => {
    const { name, value } = event.target;
    setStepValue({
      ...stepValue,
      [name]: value,
    });
  };

  const addIngredient = () => {
    setSelectedIngredients([...selectedIngredients, ingredientValues]);
    setIngredientValues({
      name: "",
      quantity: 0,
      unit: "",
    });

    if (selectedIngredients) {
      setUpdatedRecipe({
        ...updatedRecipe,
        ingredients: [...updatedRecipe.ingredients, ingredientValues],
      });
    }
  };

  const addStep = () => {
    setSteps([...steps, stepValue]);
    setStepValue({
      description: "",
    });

    if (steps) {
      setUpdatedRecipe({
        ...updatedRecipe,
        steps: [...updatedRecipe.steps, stepValue],
      });
    }
  };

  const categories = [
    "potage",
    "hors d'oeuvre froid",
    "hors d'oeuvre chaud",
    "oeuf",
    "poisson",
    "coquillage, crustacé",
    "viandes",
    "abat",
    "volaille",
    "garniture",
    "dessert",
  ];

  const cookingMethods = [
    "grillé",
    "rôtis",
    "émulsionné",
    "sauté",
    "braisée",
    "poché",
  ];

  const units = [
    "mg",
    "gr",
    "kg",
    "ml",
    "cl",
    "l",
    "feuille(s)",
    "cuillère(s)",
    "pincée(s)",
  ];

  return (
    <Box
      component={"main"}
      display={"flex"}
      justifyContent={"center"}
      my={{ sm: "160px" }}
    >
      <Paper
        component="form"
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          margin: "auto",
          borderRadius: "none",
          boxShadow: "none",
        }}
      >
        <Link to="/admin/recipes">
          <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
            Retour
          </Button>
        </Link>
        <Typography variant="h5" component="h2" gutterBottom>
          Ajouter une nouvelle recette
        </Typography>
        <TextField
          id="name"
          name="name"
          label="Nom de la recette"
          variant="outlined"
          required
          sx={{ my: "5px" }}
          value={updatedRecipe.name}
          onChange={handleUpdateChange}
        />
        <FormControl>
          <InputLabel>Catégorie</InputLabel>
          <Select
            id="category"
            name="category"
            label="Methode"
            required
            sx={{ my: "5px" }}
            value={updatedRecipe.category}
            onChange={handleUpdateChange}
          >
            {categories.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Methode</InputLabel>
          <Select
            id="cookingMethod"
            name="cookingMethod"
            label="Methode"
            required
            sx={{ my: "5px" }}
            value={updatedRecipe.cookingMethod}
            onChange={handleUpdateChange}
          >
            {cookingMethods.map((method, index) => (
              <MenuItem value={method} key={index}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction={"row"}>
          <FormControl sx={{ flexDirection: "row" }}>
            <InputLabel>Ingrédients</InputLabel>
            <Select
              id="ingredients"
              name="name"
              label="Ingredient"
              sx={{
                my: "5px",
                mr: "5px",
                width: "120px",
              }}
              value={ingredientValues.name}
              onChange={handleIngredientChange}
            >
              {ingredients.map((ingredient, index) => (
                <MenuItem value={ingredient.name} key={index}>
                  {ingredient.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Quantité"
              type="number"
              name="quantity"
              required
              value={ingredientValues.quantity}
              sx={{ my: "5px", mr: "5px", width: "80px" }}
              InputProps={{
                inputProps: {
                  min: 0,
                },
              }}
              onChange={handleIngredientChange}
            />
          </FormControl>
          <FormControl sx={{ flexDirection: "row" }}>
            <InputLabel>Unité</InputLabel>
            <Select
              name="unit"
              required
              sx={{ my: "5px", width: "80px" }}
              value={ingredientValues.unit}
              onChange={handleIngredientChange}
            >
              {units.map((unit, index) => (
                <MenuItem value={unit} key={index}>
                  {unit}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={addIngredient}>
              {<PlaylistAddOutlinedIcon />}
            </Button>
          </FormControl>
        </Stack>
        <Stack direction={"row"}>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            sx={{ my: "5px", width: "100%" }}
            value={stepValue.description}
            onChange={handleStepChange}
          />{" "}
          <Button onClick={addStep}>{<PlaylistAddOutlinedIcon />}</Button>
        </Stack>
        <OutlinedInput
          type="file"
          id="image"
          name="image"
          accept=".jpg, .jpeg, .png, .webp"
          variant="outlined"
          sx={{ my: "5px" }}
          onChange={handleUpdateImage}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {showAlert ? (
            <CircularProgress color="info" size={25} />
          ) : (
            "Enregistrer les modifications"
          )}
        </Button>
        {/* Display ingredient added by user returning data from [selectedIngredients]*/}
        <Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            {updatedRecipe.ingredients.map((component, index) => (
              <List key={index}>
                <Paper elevation={3}>
                  <ListItem>
                    <ListItemText>{component.name}</ListItemText>
                    <ListItemText>{component.quantity}</ListItemText>
                    <ListItemText>{component.unit}</ListItemText>
                    <Tooltip
                      title="Supprimer"
                      followCursor
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(index, "ingredient")}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </Paper>
              </List>
            ))}
          </Stack>
          {/* Display step added by user returning data from [steps]*/}
          <Stack direction={"column"}>
            {updatedRecipe.steps.map((step, index) => (
              <List key={index}>
                <Paper elevation={3}>
                  <ListItem>
                    <ListItemText sx={{ mr: 1 }}>{index}</ListItemText>
                    <ListItemText>{step.description}</ListItemText>
                    <Tooltip
                      title="Supprimer"
                      followCursor
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(index, "step")}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </Paper>
              </List>
            ))}
          </Stack>
        </Box>
      </Paper>
      {showAlert && (
        <Box>
          <SnackBarComponent
            severity={"info"}
            textAlert={"Recette modifiée!"}
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminEditRecipePage;
