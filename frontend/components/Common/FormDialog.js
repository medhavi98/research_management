import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextFieldComponent from "./TextFieldComponent";

export default function FormDialog({
  testButton,
  Title,
  Description,
  children,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        {testButton}
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{Description}</DialogContentText>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
