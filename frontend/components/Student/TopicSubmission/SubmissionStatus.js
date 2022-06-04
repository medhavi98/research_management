import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  Button,
  Tooltip,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserSessionDetails } from '../../../helpers/userSessionHandler';
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { BASE_URL } from '../../constants';
import axios from 'axios';

const SubmissionStatus = ({ groupId }) => {

  const { userId } = getUserSessionDetails();
  const [requests, setRequests] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [researchGroup, setResearchGroup] = useState("");
  const [researchField, setResearchField] = useState("");
  const [description, setDescription] = useState("");
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');


  const handleClickOpen = (scrollType, id) => () => {
    setOpen(true);
    setScroll(scrollType);
    console.log(`Click ID :  ${id}`);
    fetchRequestById(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const fetchRequests = async () => {
    try {

      const response = await axios.get(`${BASE_URL}/user/getGroupIds/${userId}`);
      const group_id = response.data.groupIds[0]
      const requests = await axios.get(`${BASE_URL}/requests/getRequests/${group_id}`);
      if(requests.data.requests[0].supervisor.type === "supervisor"){
        // setRequests(requests.data.requests);
      }      
      const supervisorID = requests.data.requests[0].supervisor.supervisorId;
      
      const supervisorRequest = await axios.get(`${BASE_URL}/requests/getRequestsByUserId/${supervisorID}`);
      if(supervisorRequest.status === 200){
        setRequests(supervisorRequest.data.requests);
        console.log("Supervisor request only : ",supervisorRequest);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const fetchRequestById = async (rId) => {
    try {

      const response = await axios.get(`${BASE_URL}/requests/requestById/${rId}`);
      console.log(response.data.request);

      if (response.status === 200) {
        setTopicName(response.data.request.topicName);
        setResearchGroup(response.data.request.researchGroup);
        setResearchField(response.data.request.researchField);
        setDescription(response.data.request.topicDescription);
        setDate(response.data.request.requestDate);
        setStatus(response.data.request.status);
        setReview(response.data.request.review);
      }

      const requestId = response.data.request.supervisor.supervisorId

      const requestSupervisor = await axios.get(`${BASE_URL}/user/getSupervisors/${requestId}`);
      if (requestSupervisor.status === 200) {
        setSupervisor(requestSupervisor.data.supervisor.fullName);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, [])

  return (
    <Container>
      <Grid container md={12} className='status-cards-layout' sx={{ display: 'flex', justifyContent: 'center', }}>
        <Grid item sx={{ mt: 5 }}>
          <Typography className='title' variant='h5'><span style={{ color: 'black' }}>Initial Submission Status</span> : {groupId}</Typography>
          <hr />
        </Grid>
        
        <Grid item>
          {requests.map((request) => {
            return (
              <Tooltip title={'Click to view card details'} TransitionComponent={Zoom}>
                <Card className='status-card' onClick={handleClickOpen('paper', request._id)}>
                  <div>
                    <Grid item>
                      <Typography className='date'>Submitted : {request.requestDate.substring(0, 10)}</Typography>
                    </Grid>
                  </div>
                  <div className='card-content'>
                    <Grid item md={9}>
                      <Typography className='topic'>{request.topicName}</Typography>
                      {/* <Typography className='message-body' sx={{ mt: 2 }}>
                  Topic description Topic description Topic description
                </Typography> */}
                    </Grid>
                    <Grid item md={3}>
                      <div className='button-cover'>
                        {
                          request.status === "Pending" ?
                            <Button className='status-pending-button' startIcon={<PendingIcon id="icon" />}>&nbsp;&nbsp;&nbsp;Pending</Button>
                            : request.status === "Accept" ?
                              <Button className='status-accept-button' startIcon={<CheckIcon id="icon" />}>&nbsp;&nbsp;&nbsp;Accept</Button>
                              : request.status === "Reject" ?
                                <Button className='status-reject-button' startIcon={<CancelIcon id="icon" />}>&nbsp;&nbsp;&nbsp;Reject</Button>
                                : null
                        }
                      </div>
                    </Grid>
                  </div>
                </Card>
              </Tooltip>
            )
          })}

        </Grid>

        <Grid item>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
              <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Initial Submission Details</span>
                <span><small style={{ color: 'gray' }}>{date.substring(0, 10)}</small></span>
              </DialogTitle>
              <DialogContent className="card-dialog" dividers={scroll === 'paper'}>
                <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1} >
                  <div>
                    <Grid item>
                      <TextField
                        margin="normal"
                        required
                        className='form-field'
                        label="Group ID"
                        autoComplete="false"
                        name="GroupID"
                        value={groupId}
                        color="success"
                        sx={{
                          width: "100%"
                        }}
                        variant="outlined"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        margin="normal"
                        required
                        className='form-field'
                        label="Supervisor"
                        autoComplete="false"
                        name="supervisor"
                        value={supervisor}
                        color="success"
                        sx={{
                          width: "100%"
                        }}
                        variant="outlined"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        margin="normal"
                        required
                        className='form-field'
                        label="Topic Name"
                        autoComplete="false"
                        name="topicName"
                        value={topicName}
                        color="success"
                        sx={{
                          width: "100%"
                        }}
                        variant="outlined"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        margin="normal"
                        required
                        className='form-field'
                        label="Research Group"
                        autoComplete="false"
                        name="researchGroup"
                        value={researchGroup}
                        color="success"
                        sx={{
                          width: "100%"
                        }}
                        variant="outlined"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        margin="normal"
                        required
                        className='form-field'
                        label="Research Area"
                        autoComplete="false"
                        name="researchField"
                        value={researchField}
                        color="success"
                        sx={{
                          width: "100%"
                        }}
                        variant="outlined"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        margin="normal"
                        required
                        style={{ border: 'none' }}
                        className='form-field'
                        label="Topic Description"
                        autoComplete="false"
                        name="description"
                        value={description}
                        color="success"
                        sx={{
                          width: "100%"
                        }}
                        variant="outlined"
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <FormControl color="success" sx={{ minWidth: '100%', mt: 2 }}>
                        <InputLabel id="demo-simple-select-helper-label">Request Status</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          label="Request Status"
                          autoComplete="false"
                          value={status}
                          InputProps={{
                            disableUnderline: true,
                            readOnly: true
                          }}
                          required
                        >
                          <MenuItem value={status}>{status}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item md={12} mt={2}>
                      <TextField
                        id="outlined-multiline-static"
                        label="Supervisor Feedback"
                        multiline
                        autoComplete="false"
                        rows={3}
                        sx={{ width: '100%' }}
                        InputProps={{
                          disableUnderline: true,
                          readOnly: true
                        }}
                        classes="form-field"
                        value={review}
                      />
                    </Grid>
                  </div>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SubmissionStatus