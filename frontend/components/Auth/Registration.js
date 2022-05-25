import { useState } from "react";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import img from "../asset/login2.jpg";
import DropDown from "../Common/DropDown";
import TextFieldComponent from "../Common/TextFieldComponent";
import StudentRegister from "./Helper/StudentRegister";
import StaffRegister from "./Helper/StaffRegister";
import { BASE_URL } from "../constants";
import axios from "axios";

const Registration = () => {
  const userTypes = [
    { name: "Student", value: "as student" },
    { name: "Staff", value: "as staff" },
  ];
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [sliitEmail, setSliitEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [nic, setNic] = useState("");
  const [studentId, setStudentId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [interestFields, setInterestFields] = useState([]);
  const [registerType, setRegisterType] = useState([]);
  const [userType, setUserType] = useState("");

  const userTypeHandler = (event) => {
    setUserType(event.target.value);
  };

  const onButtonPress = async () => {
    let response;
    if (userType === "as student") {
      response = await axios.post(`${BASE_URL}/user`, {
        fullName,
        password,
        department,
        phone,
        sliitEmail,
        personalEmail,
        nic,
        studentId,
      });
    } else if (userType === "as staff") {
      response = await axios.post(`${BASE_URL}/user`, {
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
      });

    }
    console.log(response.data)
  };

  return (
    <div>
      <Grid m={10} md={12} xs={12}>
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            boxShadow: 2,
            borderRadius: 5,
          }}
          className="login-box"
        >
          <Grid container>
            <Grid item md={6}>
              <CardMedia
                component="img"
                height="1000"
                image={img}
                alt="login"
                sx={{ borderRadius: "15px 0px 0px 15px" }}
              />
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                borderRadius: "0px 15px 15px 0px",
              }}
            >
              <Typography variant="h5" align="center" pt={2}>
                <b> Register {userType}</b>
              </Typography>

              <Grid container m={5}>
                <Grid item md={12}>
                  <DropDown
                    label="I am"
                    tValue="I am"
                    name="user_type"
                    value={userType}
                    minWidth="88%"
                    onChange={userTypeHandler}
                    options={userTypes}
                    helperText={!userType ? "Please select your user type" : ""}
                  />
                </Grid>

                {userType === "as student" && <StudentRegister
                  fullName={fullName}
                  password={password}
                  department={department}
                  phone={phone}
                  sliitEmail={sliitEmail}
                  personalEmail={personalEmail}
                  nic={nic}
                  studentId={studentId}
                  setFullName={setFullName}
                  setPassword={setPassword}
                  setDepartment={setDepartment}
                  setPhone={setPhone}
                  setSliitEmail={setSliitEmail}
                  setPersonalEmail={setPersonalEmail}
                  setNic={setNic}
                  setStudentId={setStudentId}
                />}
                {userType === "as staff" && <StaffRegister
                  fullName={fullName}
                  password={password}
                  department={department}
                  phone={phone}
                  sliitEmail={sliitEmail}
                  personalEmail={personalEmail}
                  nic={nic}
                  staffId={staffId}
                  interestFields={interestFields}
                  registerType={registerType}
                  setFullName={setFullName}
                  setPassword={setPassword}
                  setDepartment={setDepartment}
                  setPhone={setPhone}
                  setSliitEmail={setSliitEmail}
                  setPersonalEmail={setPersonalEmail}
                  setNic={setNic}
                  setStaffId={setStaffId}
                  setInterestFields={setInterestFields}
                  setRegisterType={setRegisterType}
                />}
                <Grid item md={12} pt={4}>
                  {!userType ? <></> : (
                    <Button
                      onClick={onButtonPress}
                      variant="contained"
                      color="success"
                      sx={{ width: "20%" }}
                    >
                      Register
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default Registration;
