import { useState } from "react";
import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import img from "../asset/login2.jpg";
import DropDown from "../Common/DropDown";
import TextFieldComponent from "../Common/TextFieldComponent";
import StudentRegister from "./Helper/StudentRegister";
import StaffRegister from "./Helper/StaffRegister";

const Registration = () => {
  const userTypes = [
    { name: "Student", value: "as student" },
    { name: "Staff", value: "as staff" },
  ];

  const [userType, setUserType] = useState("");

  const userTypeHandler = (event) => {
    setUserType(event.target.value);
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

                {userType === "as student" && <StudentRegister />}
                {userType === "as staff" && <StaffRegister />}

                <Grid item md={12} pt={4}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: "20%" }}
                  >
                    Register
                  </Button>
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
