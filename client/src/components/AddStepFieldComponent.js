import React, { useState } from "react";
import { TextField, IconButton, Grid } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const AddStepFieldComponent = ({ name, color1, color2 }) => {
  const [formInputs, setFormInputs] = useState([{ value: "" }]);

  const handleAddInput = () => {
    setFormInputs([...formInputs, { value: "" }]);
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...formInputs];
    updatedInputs.splice(index, 1);
    setFormInputs(updatedInputs);
  };

  const handleInputChange = (index, event) => {
    const updatedInputs = [...formInputs];
    updatedInputs[index].value = event.target.value;
    setFormInputs(updatedInputs);
  };

  return (
    <Grid container spacing={2}>
      {formInputs.map((input, index) => (
        <Grid item xs={12} key={index}>
          <TextField
            label={`${name} ${index + 1}`}
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
            fullWidth
          />
          {index === formInputs.length - 1 ? (
            <IconButton onClick={handleAddInput}>
              <AddOutlinedIcon color={color1} />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleRemoveInput(index)}>
              <RemoveOutlinedIcon color={color2} />
            </IconButton>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default AddStepFieldComponent;
