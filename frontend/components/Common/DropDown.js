import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DropDown = ({
  label,
  name,
  value,
  options,
  error,
  helperText,
  required,
  disabled,
  className,
  onChange,
  tValue,
  minWidth,
}) => {
  // const classes = useStyles();

  return (
    <div>
      <FormControl color="success" sx={{ minWidth: { minWidth } }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          disabled={disabled}
          value={value}
          label={tValue}
          onChange={onChange}
          // name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

// DropDown.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.string,
//       name: PropTypes.string,
//     })
//   ).isRequired,
//   error: PropTypes.bool,
//   helperText: PropTypes.string,
//   required: PropTypes.bool,
//   disabled: PropTypes.bool,
//   className: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
// };

// DropDown.defaultProps = {
//   error: false,
//   helperText: '',
//   required: true,
//   disabled: false,
//   className: '',
// };

export default DropDown;
