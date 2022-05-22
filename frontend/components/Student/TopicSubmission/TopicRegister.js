import React, { useState } from "react";
import {
  Container,
  Box,
  Button,
  Grid,
  Item,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";
import DropDown from "../../Common/DropDown";
import axios from "axios";


const TopicRegister = () => {

  const supervisorList = [
    { name: "Jagath", value: "Jagath" },
    { name: "Prasanna", value: "Prasanna" },
  ];

  const coSupervisorList = [
    { name: "Suranga", value: "Suranga" },
    { name: "Kumaara", value: "Kumaara" },
  ];

  const [values, setValues] = useState({
    registerType: "",
    fulName: [],
    supervisorId: "",
    groupId: "",
    topicName: "",
    topicDescription: "",
    researchField: "",
    interestFields: ""
  });

  const handleOnChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };


  const getResearchInterest = async (event) => {
    event.preventDefault();
    try {

      const data = {
        interestFields: values.researchField,
        registerType: values.registerType
      }

      console.log(data);

      const response = await axios.get(`http://localhost:5001/user/${data}`);
      console.log(response);
      // if(response.status === 200) {
      // }

    } catch (error) {
      console.log(error);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <Container>
      <Grid m={10} md={12} xs={12}>
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
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Supervisor">Supervisor</MenuItem>
                        <MenuItem value="CoSupervisor">CoSupervisor</MenuItem>
                      </Select>
                      <FormHelperText>
                        {
                          !values.registerType
                            ? "Please select submission type"
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
                      <DropDown
                        label="Supervisor Name"
                        tValue="Supervisor Name"
                        name="user_name"
                        value={values.fulName}
                        minWidth="100%"
                        onChange={handleOnChange("fulName")}
                        options={supervisorList}
                        helperText={
                          !values.fulName ? "Please select supervisor" : ""
                        }
                      />
                    </Grid>
                  ) : values.registerType === "CoSupervisor" ? (
                    <Grid item md={12} sx={{ mt: 2 }}>
                      <DropDown
                        label="Co-Supervisor Name"
                        tValue="Co-Supervisor Name"
                        name="user_name"
                        value={values.fulName}
                        minWidth="100%"
                        onChange={handleOnChange("fulName")}
                        options={coSupervisorList}
                        helperText={
                          !values.fulName ? "Please select co-supervisor" : ""
                        }
                      />
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

                  <Grid item md={12}>
                    <TextFieldComponent
                      label="Topic Description"
                      name="topicDescription"
                      classes="form-field"
                      inputValue={values.topicDescription}
                      handleChange={handleOnChange("topicDescription")}
                      width="100%"
                      required
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
        </Box>
      </Grid>
    </Container>
  );
};

export default TopicRegister;
