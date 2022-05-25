import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { setUserSession } from "../../helpers/userSessionHandler";
import img from "../asset/login2.jpg";
import TextFieldComponent from "../Common/TextFieldComponent";
import { BASE_URL } from "../constants";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginPress = async () => {
    const response = await axios.post(`${BASE_URL}/user/login`, { email, password });
    console.log(response.data);
    if (response?.data?.error) {
      alert(response.data.error);
    } else if (response?.data?.user) {
      setUserSession(response.data.user._id);
      alert('Login is successful!');
      window.location = '/';
    }
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
                height="500"
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
              <Typography variant="h4" align="center" pt={2}>
                Login
              </Typography>

              <Grid container m={5}>
                <Grid item md={12}>
                  <TextFieldComponent
                    label="Email Address"
                    inputName="email"
                    classes="form-field"
                    width="88%"
                    required
                    inputValue={email}
                    handleChange={e => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item md={12}>
                  <TextFieldComponent
                    label="Password"
                    inputName="Password"
                    classes="form-field"
                    width="88%"
                    required
                    inputValue={password}
                    handleChange={e => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item md={12} pt={2}>
                  <Button
                    onClick={onLoginPress}
                    variant="contained"
                    color="success"
                    sx={{ width: "20%" }}
                  >
                    Login
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

export default Login;
