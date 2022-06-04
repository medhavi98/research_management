import React, { useEffect, useState } from "react";
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
import TextFieldComponent from "../../Common/TextFieldComponent";
import { researchFields } from "./data";
import { BASE_URL } from "../../constants";
import { getUserSessionDetails } from '../../../helpers/userSessionHandler';
import axios from "axios";



const InitialSubmission = () => {

  const [supervisors, setSupervisors] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [supervisorId, setSupervisorId] = useState("");
  const [researchGroup, setResearchGroup] = useState("");
  const [groupId, setGroupId] = useState("");
  const [researchField, setResearchField] = useState("");
  const [description, setDescription] = useState("");
  const { userId } = getUserSessionDetails();


  const getSupervisors = async () => {
    try {

      const response = await axios.get(`${BASE_URL}/user/getSupervisors`);
      if (response.status === 200) {
        setSupervisors(response.data.users);
        console.log(response.data.users);
      }

    } catch (error) {
      alert(error);
    }
  };


  const getGroupId = async () => {
    const response = await axios.get(`${BASE_URL}/user/getGroupIds/${userId}`);
    if (response.status === 200) {
      setGroupId(response.data.groupIds[0]);
    }
  }

  useEffect(() => {
    getSupervisors();
    getGroupId();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {

      const requestDetails = {
        supervisor: {
          type: "supervisor",
          supervisorId: supervisorId
        },
        researchGroup: researchGroup,
        researchField: researchField,
        topicName: topicName,
        groupId: groupId,
        topicDescription: description,
      }
      console.log(requestDetails);

      const response = await axios.post(`${BASE_URL}/requests/`, { requestDetails });
      if (response.status === 201) {
        alert('Supervisor Request Success ✅');
        setTopicName("");
        setResearchGroup("");
        setResearchField("");
        setSupervisorId("");
        setDescription("");

        window.location.reload()
      }

    } catch (error) {
      alert(error);
    }
  };


  return (
    <Container>
      <Grid mb={8} md={12} xs={12}>
        <Grid item sx={{ mt: 5 }}>
          <Typography variant="h4">Topic Register</Typography>
          <hr />
        </Grid>

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
              <form onSubmit={submitHandler}>
                <Grid container m={8}>
                  <Grid item md={12}>
                    <TextFieldComponent
                      label="Topic (Tentative)"
                      name="topicName"
                      classes="form-field"
                      inputValue={topicName}
                      handleChange={(e)=> setTopicName(e.target.value)}
                      width="100%"
                      required
                    />
                  </Grid>

                  <Grid item md={12}>
                    <FormControl color="success" sx={{ minWidth: '100%', mt: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label">Research Group</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={researchGroup}
                        label="Research Group"
                        onChange={(e)=> setResearchGroup(e.target.value)}
                        required
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="Autonomous Intelligent Machines and Systems (AIMS)">Autonomous Intelligent Machines and Systems (AIMS)</MenuItem>
                        <MenuItem value="Machine Learning and Soft Computing (MLSC)">Machine Learning and Soft Computing (MLSC)</MenuItem>
                        <MenuItem value="Knowledge Inspired Computing (KIC)">Knowledge Inspired Computing (KIC)</MenuItem>
                        <MenuItem value="Computing for Inclusive and Equitable Society (CIEC)">Computing for Inclusive and Equitable Society (CIEC)</MenuItem>
                        <MenuItem value="Computing Infrastructure and Security (CIS)">Computing Infrastructure and Security (CIS)</MenuItem>
                        <MenuItem value="Software Systems & Technologies (SST)">Software Systems & Technologies (SST)</MenuItem>
                      </Select>
                      <FormHelperText>
                        {
                          !researchGroup
                            ? "Please select Research Group"
                            : ""
                        }
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item md={12}>
                    <FormControl color="success" sx={{ minWidth: '100%', mt: 2 }}>
                      <InputLabel id="demo-simple-select-helper-label">Research Area</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        classes="form-field"
                        width="100%"
                        label="Research Area"
                        value={researchField}
                        onChange={(e)=> setResearchField(e.target.value)}
                        required
                      >
                        <MenuItem defaultValue=""></MenuItem>
                        {researchFields.map((list) => {
                          return (
                            <MenuItem value={list.field_name} key={list.id}>{list.field_name}</MenuItem>
                          )
                        })}
                      </Select>
                      <FormHelperText>
                        {
                          !researchField
                            ? "Please select Research Area"
                            : null
                        }
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item md={12} sx={{ mt: 2 }}>
                    <FormControl color="success" sx={{ minWidth: '100%' }}>
                      <InputLabel id="demo-simple-select-helper-label">Supervisor Name</InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Supervisor Name"
                        value={supervisorId}
                        onChange={(e)=> setSupervisorId(e.target.value)}
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
                          !supervisorId
                            ? "Please select supervisor"
                            : null
                        }
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item md={12} mt={2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Topic Description"
                      multiline
                      rows={3}
                      sx={{ width: '100%' }}
                      classes="form-field"
                      value={description}
                      onChange={(e)=> setDescription(e.target.value)}
                    />

                  </Grid>
                  <Grid item md={12} pt={2}>
                    {topicName && researchGroup && researchField
                      && supervisorId && description !== "" ?
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ width: "40%" }}
                      >Submit
                      </Button>
                      :
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        disabled
                        sx={{ width: "40%" }}
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

export default InitialSubmission;
