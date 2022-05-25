import { Grid, Typography } from "@mui/material";
import CheckBox from "../../Common/CheckBox";
import TextFieldComponent from "../../Common/TextFieldComponent";

const StaffRegister = ({
  fullName,
  password,
  department,
  phone,
  sliitEmail,
  personalEmail,
  nic,
  staffId,
  interestFields,
  registerType,
  setFullName,
  setPassword,
  setDepartment,
  setPhone,
  setSliitEmail,
  setPersonalEmail,
  setNic,
  setStaffId,
  setInterestFields,
  setRegisterType
}) => {
  const category = [
    { checkBoName: "Supervisor" },
    { checkBoName: "Co-Supervisor" },
    { checkBoName: "Panel-Member" },
  ];

  const staffTypeHandler = type => {
    if (!registerType.includes(type)) {
      setRegisterType([...registerType, type])
    } else {
      const newArray = registerType.filter(value => {
        return value !== type;
      });
      setRegisterType(newArray);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item md={12}>
          <TextFieldComponent
            label="Name with initials"
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
            label="Staff ID"
            inputName="staffId"
            classes="form-field"
            width="88%"
            required
            inputValue={staffId}
            handleChange={e => setStaffId(e.target.value)}
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
        <Grid item md={12} pt={4}>
          <Typography variant="subtitle">Register as</Typography>
          <CheckBox options={category} onChange={e => staffTypeHandler(e.target.value)} />
        </Grid>
      </Grid>
    </>
  );
};

export default StaffRegister;
