import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  CardMedia,
  Grid,
  Item,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  TextField,
} from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent"
import axios from "axios";


const TopicRegister = () => {

  const [values, setValues] = useState({
    registerType: "",
    fulName: "",
    supervisorId: "",
    groupId: "",
    description:"",
    topicName: "",
    researchField: "",
    interestFields: ""
  });

  const [supervisors, setSupervisors] = useState([]);
  const [userID, setUserID] = useState("");

  const handleOnChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };


  const getResearchInterest = async (event) => {
    event.preventDefault();
    try {

        registerType = values.registerType,
        interestFields = values.researchField

      const response = await axios.get(`http://localhost:5001/user/${registerType}/${interestFields}`);
      console.log(response.data.user);
      if (response.status === 200) {
        setSupervisors(response.data.user);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    try {

      const topicDetails = {
        submissionType: values.registerType,
        supervisorId: values.supervisorId,
        groupId: "",
        topicName: values.topicName,
        researchField: values.researchField,
        topicDescription: values.description,
      }
      console.log(topicDetails);

      const response = await axios.post('http://localhost:5001/topics/', { topicDetails });
      if (response.status === 201) {
        alert('Topic Register Success');
      }

    } catch (error) {
      alert(error);
    }

  };

  return (
    <Container>
      <Grid mb={10} md={12} xs={12}>
        <Typography variant="h4">Topic Register</Typography>
        <hr />
        <Box
          className="box-shadow"
          sx={{
            mt: 5,
            backgroundColor: "white",
            boxShadow: 2,
            borderRadius: 5,
            width: "950px",
          }}
        >
          <Grid container>
            <Grid
              item
              md={4}
              sx={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              className="card-gradient"
            >
              {/* <CardMedia
                component="img"
                height="500"
                image={img}
                alt="login"
                sx={{ borderRadius: "15px 0px 0px 15px" }}
              /> */}
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                borderRadius: "0px 15px 15px 0px",
              }}
            >
              <form>
                <Grid container m={8}>
                  <Grid item md={12}>
                    <FormControl color="success" sx={{ minWidth: '100%' }}>
                      <InputLabel id="demo-simple-select-helper-label">Submission Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={values.registerType}
                        label="Submission Type"
                        onChange={handleOnChange("registerType")}
                        required
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Supervisor">Supervisor</MenuItem>
                        <MenuItem value="Co-Supervisor">Co-Supervisor</MenuItem>
                      </Select>
                      <FormHelperText>
                        {
                          !values.registerType
                            ? "Please select user type"
                            : ""
                        }
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={12}
                    sx={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <TextFieldComponent
                      label="Research Field"
                      name="researchField"
                      classes="form-field"
                      width="100%"
                      inputValue={values.researchField}
                      handleChange={handleOnChange("researchField")}
                      required
                    />
                    <Button
                      sx={{
                        m: 3,
                        p: 2,
                        height: "40px",
                        width: "60px",
                      }}
                      variant="contained"
                      type="submit"
                      color="primary"
                      onClick={getResearchInterest}
                    >
                      Find
                    </Button>
                  </Grid>

                  {values.registerType === "Supervisor" ? (
                    <Grid item md={12} sx={{ mt: 2 }}>

                      <FormControl color="success" sx={{ minWidth: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Supervisor Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Supervisor Name"
                          value={values.supervisorId}
                          onChange={handleOnChange("supervisorId")}
                          required
                        >
                          <MenuItem value=""></MenuItem>
                          {supervisors.map((list) => {
                            return (
                              <MenuItem value={list._id} key={list._id}>{list.fullName}</MenuItem>
                            )
                          })}
                        </Select>
                        <FormHelperText>
                          {
                            !values.supervisorId
                              ? "Please select supervisor"
                              : ""
                          }
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  ) : values.registerType === "Co-Supervisor" ? (
                    <Grid item md={12} sx={{ mt: 2 }}>
                      <FormControl color="success" sx={{ minWidth: '100%' }}>
                        <InputLabel id="demo-simple-select-helper-label">Co-Supervisor Name</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Co-Supervisor Name"
                          value={values.supervisorId}
                          onChange={handleOnChange("supervisorId")}
                          required
                        >
                          <MenuItem value=""></MenuItem>
                          {supervisors.map((list) => {
                            return (
                              <MenuItem value={list._id} key={list._id}>{list.fullName}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : null}

                  <Grid item md={12}>
                    <TextFieldComponent
                      label="Topic Name"
                      name="topicName"
                      classes="form-field"
                      inputValue={values.topicName}
                      handleChange={handleOnChange("topicName")}
                      width="100%"
                      required
                    />
                  </Grid>

                  <Grid item md={12} mt={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Topic Description"
                      multiline
                      rows={3}
                      sx={{ width: '100%' }}
                      classes="form-field"
                      value={values.description}
                      onChange={handleOnChange("description")}
                    />

                  </Grid>
                  <Grid item md={12} pt={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ width: "40%" }}
                      onClick={submitHandler}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box >
      </Grid >
    </Container >
  );
};

export default TopicRegister;
