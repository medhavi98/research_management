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
  Snackbar,
  Alert,
  Card
} from "@mui/material";
import TextFieldComponent from "../../Common/TextFieldComponent";
import { researchFields } from "./data";
import axios from "axios";


const TopicRegister = () => {

  const [values, setValues] = useState({
    registerType: "",
    fulName: "",
    supervisorId: "",
    groupId: "",
    description: "",
    topicName: "",
    researchField: "",
    interestFields: ""
  });

  const [supervisors, setSupervisors] = useState([]);

  const handleOnChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values);
  };


  const getResearchInterest = async (event) => {
    event.preventDefault();
    try {

      registerType = values.registerType,
        interestFields = values.researchField

      const response = await axios.get(`http://localhost:5001/user/interestFields/${registerType}/${interestFields}`);
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
        setValues({
          registerType: "",
          supervisorId: "",
          topicName: "",
          researchField: "",     
          description: "",
        });
      }

    } catch (error) {
      alert(error);
    }
  };




  return (
    <Container>
      <Grid mb={8} md={12} xs={12}>
        {/* <div>
          <Button
            onClick={handleClick({
              vertical: 'top',
              horizontal: 'center',
            })}
          >
            Top-Center
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
            autoHideDuration='2000'
          >
            <Alert variant="filled" severity="success">
              This is a success message!
              Test Successful
            </Alert>
          </Snackbar>
        </div> */}
        <Typography variant="h4">Topic Register</Typography>
        <hr />
        <Box
          className="box-shadow"
          sx={{
            mt: 5,
            backgroundColor: "white",
            boxShadow: 2,
            borderRadius: 5,
            width: "850px",
          }}
        >
          <Grid container>
            <Grid
              item
              md={3}
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
              md={7}
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
                      justifyContent: "space-between",
                      alignItems:"center",
                      mt: 2
                    }}
                  >
                    <FormControl color="success" sx={{ minWidth: '80%' }}>
                      <InputLabel id="demo-simple-select-helper-label">Research Field</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        classes="form-field"
                        width="100%"
                        label="Research Field"
                        value={values.researchField}
                        onChange={handleOnChange("researchField")}
                        required
                      >
                        <MenuItem defaultValue=""></MenuItem>
                        {researchFields.map((list)=> {
                          return(
                            <MenuItem value={list.field_name} key={list.id}>{list.field_name}</MenuItem>
                          )
                        })}
                      </Select>
                      <FormHelperText>
                        {
                          !values.researchField
                            ? "Please select Research Field"
                            : null
                        }
                      </FormHelperText>
                    </FormControl>

                    {values.registerType && values.researchField !== "" ?
                      <Button
                        sx={{
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
                      :
                      <Button
                        sx={{            
                          mb: 3,           
                          height: "40px",
                          width: "60px",
                        }}
                        variant="contained"
                        type="submit"
                        disabled
                        color="primary"
                        onClick={getResearchInterest}
                      >
                        Find
                      </Button>
                    }
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
                          {supervisors.length < 1 ?
                            <MenuItem value="">No Records found</MenuItem> : null
                          }
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
                          {supervisors.length < 1 ?
                            <MenuItem value="">No Records found</MenuItem> : null
                          }
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
                    {values.registerType && values.researchField &&
                      values.topicName && values.supervisorId
                      && values.description !== "" ?
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ width: "40%" }}
                        onClick={submitHandler}
                      >Submit
                      </Button>
                      :
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled
                        sx={{ width: "40%" }}
                        onClick={submitHandler}
                      >
                        Submit
                      </Button>
                    }
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
