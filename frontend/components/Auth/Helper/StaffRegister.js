import { Grid, Typography } from "@mui/material";
import CheckBox from "../../Common/CheckBox";
import TextFieldComponent from "../../Common/TextFieldComponent";

const StaffRegister = () => {
  const category = [
    { checkBoName: "Supervisor" },
    { checkBoName: "Co-Supervisor" },
    { checkBoName: "Panel-Member" },
  ];

  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <TextFieldComponent
            label="Name with initials"
            inputName="name"
            classes="form-field"
            width="88%"
            required
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="NIC"
            inputName="nic"
            classes="form-field"
            width="88%"
            required
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="Staff ID"
            inputName="staffId"
            classes="form-field"
            width="88%"
            required
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="SLIIT email"
            inputName="sMail"
            classes="form-field"
            width="88%"
            required
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="Personal email"
            inputName="pMail"
            classes="form-field"
            width="88%"
            required
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="Password"
            inputName="password"
            classes="form-field"
            width="88%"
            type="password"
            required
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="Phone Number"
            inputName="phone"
            classes="form-field"
            type="number"
            width="88%"
            required
          />
        </Grid>
        <Grid item md={12} pt={4}>
          <Typography variant="subtitle">Register as</Typography>
          <CheckBox options={category} />
        </Grid>
      </Grid>
    </>
  );
};

export default StaffRegister;
