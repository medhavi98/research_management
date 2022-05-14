import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import img from "../asset/login2.jpg";
import TextFieldComponent from "../Common/TextFieldComponent";
const Login = () => {
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
                  />
                </Grid>
                <Grid item md={12}>
                  <TextFieldComponent
                    label="Password"
                    inputName="Password"
                    classes="form-field"
                    width="88%"
                    required
                  />
                </Grid>
                <Grid item md={12} pt={2}>
                  <Button
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
