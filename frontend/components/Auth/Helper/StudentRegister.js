import { Grid } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";

const StudentRegister = () => {
  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <TextFieldComponent
            label="Name With Initials"
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
            label="Registration Number"
            inputName="rNo"
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
      </Grid>
    </>
  );
};

export default StudentRegister;
