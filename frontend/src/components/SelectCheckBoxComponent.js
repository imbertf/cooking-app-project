import * as React from "react";
import { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";

const toolImages = [
  {
    name: "casserole",
    path: "../../images/tools/casserole.webp",
  },
  {
    name: "fouet",
    path: "",
  },
  {
    name: "Rouleau",
    path: "",
  },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectCheckBoxComponent() {
  const [toolImage, setToolImage] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setToolImage(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl
      sx={{
        mb: "5px",
        minWidth: "100%",
      }}
      required
    >
      <InputLabel id="demo-multiple-checkbox-label">
        Image de l'ustensile
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={toolImage}
        onChange={handleChange}
        input={<OutlinedInput label="Image de l'ustensile" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {toolImages.map((tool) => (
          <MenuItem key={tool.name} value={tool.name}>
            <Checkbox checked={toolImage.indexOf(tool.name) > -1} />
            <ListItemText primary={tool.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
