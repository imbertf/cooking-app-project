import * as React from "react";
import { IconButton, Alert, Snackbar, Tooltip, Zoom } from "@mui/material";

export default function ActionButtonComponent({
  text,
  color,
  severity,
  toolTip,
  clickAction,
  Children,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Tooltip title={toolTip} followCursor TransitionComponent={Zoom}>
      <div onClick={clickAction}>
        <IconButton onClick={handleClick}>{Children}</IconButton>
        <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {text}
          </Alert>
        </Snackbar>
      </div>
    </Tooltip>
  );
}
