import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const CheckBox = ({ options, value, label, onChange }) => {
  return (
    <>
      <FormGroup>
        {options.map((option, index) => {
          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green",
                    },
                  }}
                />
              }
              value={option.checkBoName}
              label={option.checkBoName}
              onChange={onChange}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default CheckBox;
