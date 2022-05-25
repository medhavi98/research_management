import { Grid } from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";

const StudentRegister = ({
  fullName,
  password,
  department,
  phone,
  sliitEmail,
  personalEmail,
  nic,
  studentId,
  setFullName,
  setPassword,
  setDepartment,
  setPhone,
  setSliitEmail,
  setPersonalEmail,
  setNic,
  setStudentId,
}) => {
  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <TextFieldComponent
            label="Name With Initials"
            inputName="name"
            classes="form-field"
            width="88%"
            inputValue={fullName}
            required
            handleChange={e => setFullName(e.target.value)}
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="NIC"
            inputName="nic"
            classes="form-field"
            width="88%"
            required
            inputValue={nic}
            handleChange={e => setNic(e.target.value)}
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="Registration Number"
            inputName="rNo"
            classes="form-field"
            width="88%"
            required
            inputValue={studentId}
            handleChange={e => setStudentId(e.target.value)}
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="SLIIT email"
            inputName="sMail"
            classes="form-field"
            width="88%"
            required
            inputValue={sliitEmail}
            handleChange={e => setSliitEmail(e.target.value)}
          />
        </Grid>
        <Grid item md={12}>
          <TextFieldComponent
            label="Personal email"
            inputName="pMail"
            classes="form-field"
            width="88%"
            required
            inputValue={personalEmail}
            handleChange={e => setPersonalEmail(e.target.value)}
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
            inputValue={password}
            handleChange={e => setPassword(e.target.value)}
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
            inputValue={phone}
            handleChange={e => setPhone(e.target.value)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default StudentRegister;
