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

const AdminCreateRecipePage = () => {
  // get ingrédients from DB to display them in option selection
  useEffect(() => {
    fetch("http://localhost:3000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
      });
  }, []);

  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientValues, setIngredientValues] = useState({
    name: "",
    quantity: 0,
    unit: "",
    image: "",
  });
  const [steps, setSteps] = useState([]);
  const [stepValue, setStepValue] = useState({
    description: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    cookingMethod: "",
    ingredients: [],
    steps: [],
    image: "",
  });

  const handleDelete = (index, type) => {
    let updatedList = [];

    if (type === "ingredient") {
      updatedList = [...selectedIngredients];
      updatedList.splice(index, 1);
      setSelectedIngredients(updatedList);
    } else if (type === "step") {
      updatedList = [...steps];
      updatedList.splice(index, 1);
      setSteps(updatedList);
    }

    // Update formData with the modified list
    setFormData({
      ...formData,
      [type === "ingredient" ? "ingredients" : "steps"]: updatedList,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
      image: "",
    });

    if (selectedIngredients) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredientValues],
      });
    }
  };

  const addStep = () => {
    setSteps([...steps, stepValue]);
    setStepValue({
      description: "",
    });

    if (steps) {
      setFormData({
        ...formData,
        steps: [...formData.steps, stepValue],
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // create new recipe in DB
  const handleSubmit = async (event) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("cookingMethod", formData.cookingMethod);
    formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));
    formDataToSend.append("steps", JSON.stringify(formData.steps));
    formDataToSend.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        body: formDataToSend,
      });
      console.log("Request Payload:", formDataToSend);
      if (res.ok) {
        console.log("Recipe added successfully!");
        setShowAlert(!showAlert);
      } else {
        console.log("Error adding recipe");
        console.log(res);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setTimeout(() => {
        navigate("/admin/recipes");
      }, 1);
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
          value={formData.name}
          onChange={handleChange}
        />
        <FormControl>
          <InputLabel>Catégorie</InputLabel>
          <Select
            id="category"
            name="category"
            label="Methode"
            required
            sx={{ my: "5px" }}
            value={formData.category}
            onChange={handleChange}
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
            value={formData.cookingMethod}
            onChange={handleChange}
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
          onChange={handleImageChange}
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
            "Enregistrer"
          )}
        </Button>
        {/* Display ingredient added by user returning data from [selectedIngredients]*/}
        <Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
          >
            {selectedIngredients.map((component, index) => (
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
            {steps.map((step, index) => (
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
            severity={"success"}
            textAlert={"Recette créée!"}
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminCreateRecipePage;
