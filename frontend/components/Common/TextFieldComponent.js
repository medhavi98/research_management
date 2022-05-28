import { TextField } from "@mui/material";
import React from "react";

const TextFieldComponent = ({
  name,
  id,
  classes,
  type,
  inputValue,
  label,
  handleChange,
  width,
  disabled,
}) => {
  return (
    <TextField
      margin="normal"
      required
      id={id}
      className={classes}
      label={label}
      name={name}
      value={inputValue}
      onChange={handleChange}
      type={type}
      autoComplete="false"
      disabled={disabled}
      color="success"
      sx={{
        width: { width },
      }}      
      variant="outlined"
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
};

export default TextFieldComponent;
