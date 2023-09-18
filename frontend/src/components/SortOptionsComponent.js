import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SortOptionsComponent() {
  const [option, setOption] = React.useState("");

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <FormControl sx={{ width: "100px", my: "10px" }}>
        <InputLabel id="demo-simple-select-label">Trier</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={option}
          label="Option"
          onChange={handleChange}
        >
          <MenuItem value={"name_1"}>Nom A-Z</MenuItem>
          <MenuItem value={"name_-1"}>Nom Z-A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
