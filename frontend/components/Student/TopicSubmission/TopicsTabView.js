import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Button,
    Grid,
    Item,
    Typography,
    Card,
    Tab,
} from "@mui/material";
import axios from "axios";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InitialSubmission from './InitialSubmission';
import SubmissionStatus from './SubmissionStatus';
import CoSupervisorSubmission from './CoSupervisorSubmission';
import CoSuperSubmissionStatus from './CoSuperSubmissionStatus';
import { getUserSessionDetails } from '../../../helpers/userSessionHandler';
import { BASE_URL } from "../../constants";

const TopicsTabView = () => {

    const [value, setValue] = React.useState("1");
    const { userId } = getUserSessionDetails();
    const [groupId, setGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [supervisorRequest, setSupervisorRequest] = useState("");
    const [coSupervisorRequest, setCoSupervisorRequest] = useState("");
    const [supervisorReqStatus, setSupervisorReqStatus] = useState("");
    const [coSupervisorReqStatus, setCoSupervisorReqStatus] = useState("");

    const getGroupId = async () => {

        try {

            console.log(userId);
            const response = await axios.get(`${BASE_URL}/user/getGroupIds/${userId}`);
            setGroupId(response.data.groupIds[0]);

            const group_id = response.data.groupIds[0]
            console.log("Group id ", group_id);

            if (group_id) {

                const requests = await axios.get(`${BASE_URL}/requests/getRequests/${group_id}`);
                console.log("Group request ", requests.data.requests.length);
                console.log("request", requests.data.requests[0]);

                const group = await axios.get(`${BASE_URL}/groups/getGroupDetails/${group_id}`);
                setGroupName(group.data.groups.groupName);

                console.log(group.data.groups.groupName);


                //supervisor request and status
                if (requests.data.requests.length === 0) {
                    setSupervisorRequest(false);
                    setCoSupervisorRequest(false);
                    console.log(false);
                } else {
                    setSupervisorRequest(requests.data.requests[0].supervisor.type === "supervisor");
                    setSupervisorReqStatus(requests.data.requests[0].status);
                    console.log(requests.data.requests.length);

                    console.log("supervisor : ", requests.data.requests[0].supervisor.type === "supervisor");
                    console.log("supervisor status : ", requests.data.requests[0].status);

                    if (!requests.data.requests[1]) {
                        console.log("co-supervisor request ", false);
                        setCoSupervisorReqStatus(false);

                        console.log("co-supervisor : ", requests.data.requests[1].supervisor.type === "co-supervisor");
                        console.log("co-supervisor status : ", requests.data.requests[1].status);

                    } else {
                        setCoSupervisorRequest(requests.data.requests[1].supervisor.type === "co-supervisor");
                        setCoSupervisorReqStatus(requests.data.requests[1].status)
                        console.log("co-supervisor : ", requests.data.requests[1].supervisor.type === "co-supervisor");
                        console.log("co-supervisor status : ", requests.data.requests[1].status);

                    }

                }
                // console.log("Supervisor : ", requests.data.requests[0].supervisor.type === "supervisor");


                // setSupervisorReqStatus(requests.data.requests[0].status);
                // console.log("Supervisor request status", requests.data.requests[0].status);
                // console.log("Co-supervisor request ", requests.data.requests[1].supervisor.type === "co-supervisor");


                // //co-supervisor request and status
                // setCoSupervisorRequest(requests.data.requests[1].supervisor.type === "co-supervisor");
                // console.log("Co-supervisor status ", requests.data.requests[1].supervisor.type === "co-supervisor");

                // if (requests.data.requests[1].status) {

                //     setCoSupervisorReqStatus(requests.data.requests[1].status);
                //     console.log("co sup request status", requests.data.requests[1].status);

                // } else {
                //     console.log("waiting");
                //     setCoSupervisorReqStatus("waiting");
                // }

            } else {
                alert("You have not yet create a group");
            }


        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        getGroupId();
    }, []);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Grid mb={10} md={12} xs={12}>
                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={value}>
                        <Box className='topic-box'>
                            <TabList
                                centered
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                            >
                                {/* {supervisorRequest === true ?
                                    <Tab sx={{ ml: '1%', mr: '1%' }} disabled label="Initial request" value="1" />
                                } */}

                                <Tab sx={{ ml: '1%', mr: '1%' }} label="Initial request" value="1" />
                                {/* {supervisorRequest === true ?
                                    <Tab sx={{ ml: '1%', mr: '1%' }} label="Submission Status" value="2" /> :
                                    <Tab sx={{ ml: '1%', mr: '1%' }} disabled label="Submission Status" value="2" />
                                } */}
                                <Tab sx={{ ml: '1%', mr: '1%' }} label="Submission Status" value="2" /> :

                                {/* {supervisorReqStatus !== "Accept" ?
                                    <Tab sx={{ ml: '1%', mr: '1%' }} disabled label="Co-supervisor request" value="3" /> :
                                    <Tab sx={{ ml: '1%', mr: '1%' }} label="Co-supervisor request" value="3" />
                                } */}
                                <Tab sx={{ ml: '1%', mr: '1%' }} label="Co-supervisor request" value="3" />
                                {/* {supervisorReqStatus !== "Accept" ?
                                    <Tab sx={{ ml: '1%', mr: '1%' }} disabled label="Submission Status" value="4" /> :
                                    <Tab sx={{ ml: '1%', mr: '1%' }} label="Submission Status" value="4" />
                                } */}
                                <Tab sx={{ ml: '1%', mr: '1%' }} label="Submission Status" value="4" />
                            </TabList>
                        </Box>


                        <TabPanel value="1">
                            {supervisorRequest === true && supervisorReqStatus === "Pending" ?
                                <div className='info-message'>
                                    <Typography variant='h5'>You are already submit the topic for supervisor acceptance!</Typography>
                                </div>
                                : supervisorRequest === true && supervisorReqStatus === "Reject" ?
                                    <InitialSubmission />

                                    : supervisorRequest === true && supervisorReqStatus === "Accept" ?
                                        <div className='info-message-completed'>
                                            <Typography variant='h5'>Your requested accept by the supervisor!</Typography>
                                        </div>
                                        : supervisorRequest === false ?
                                            <InitialSubmission />
                                            : null
                            }
                        </TabPanel>

                        <TabPanel value="2">
                            {supervisorRequest === false ?
                                <div className='info-message'>
                                    <Typography variant='h5'>You haven't submit the initial request yet!</Typography>
                                </div>
                                : supervisorRequest === true && supervisorReqStatus === "Reject" ?
                                    <>
                                        <div className='info-message-reject'>
                                            <Typography variant='h5'>Your request has been rejected by the supervisor, please re-submit the topic!</Typography>
                                        </div>
                                        <SubmissionStatus groupId={groupName} />
                                    </>
                                    : supervisorRequest === true && supervisorReqStatus === "Pending" ?
                                        <SubmissionStatus groupId={groupName} />
                                        : supervisorRequest === true && supervisorReqStatus === "Accept" ?
                                            <>
                                                <div className='info-message-complete'>
                                                    <Typography variant='h5'>Your requested accept by the supervisor!</Typography>
                                                </div>
                                                <SubmissionStatus groupId={groupName} />
                                            </>
                                            : null

                            }

                        </TabPanel>
                        <TabPanel value="3">
                            {supervisorRequest === false ?
                                <div className='info-message'>
                                    <Typography variant='h5'>Your initial topic submission haven't done yet, please submit the topic!</Typography>
                                </div>
                                : supervisorRequest === true && supervisorReqStatus === "Pending" || supervisorReqStatus === "Reject" ?
                                    <div className='info-message'>
                                        <Typography variant='h5'>Your initial topic submission not yet complete!</Typography>
                                    </div>
                                    : supervisorReqStatus === "Accept" && coSupervisorRequest === false ?
                                        <div className='info-message'>
                                            <Typography variant='h5'>You have not yes submit the co-supervisor request!</Typography>
                                        </div>
                                        : supervisorReqStatus === "Accept" && coSupervisorRequest === true && coSupervisorReqStatus === "Pending" ?
                                            <div className='info-message'>
                                                <Typography variant='h5'>You are already submit the co-supervisor request, please wait while the co-supervisor accepts!</Typography>
                                            </div>
                                            : supervisorReqStatus === "Accept" && coSupervisorReqStatus === "Reject" ?
                                                <>
                                                    <div className='info-message-reject'>
                                                        <Typography variant='h5'>Your request has been rejected by the co-supervisor, please re-submit the topic!</Typography>
                                                    </div>
                                                    <CoSupervisorSubmission />
                                                </>
                                                : supervisorReqStatus === "Accept" && coSupervisorReqStatus === "Accept" ?
                                                    <div className='info-message-completed'>
                                                        <Typography variant='h5'>Your requested accept by the co-supervisor!</Typography>
                                                    </div>
                                                    : supervisorRequest === true && supervisorReqStatus === "Accept" ?
                                                        <CoSupervisorSubmission />
                                                        : null
                            }

                        </TabPanel>
                        <TabPanel value="4">
                            {supervisorRequest === false ?
                                <div className='info-message'>
                                    <Typography variant='h5'>Your initial topic submission haven't done yet, please submit the topic!</Typography>
                                </div>
                                : supervisorRequest === true && supervisorReqStatus === "Pending" || supervisorReqStatus === "Reject" ?
                                    <div className='info-message'>
                                        <Typography variant='h5'>Your initial topic submission not yet complete!</Typography>
                                    </div>
                                    : supervisorRequest === true && supervisorReqStatus === "Accept" && coSupervisorRequest !== true ?
                                        <div className='info-message'>
                                            <Typography variant='h5'>Your have not yet submit the co-supervisor request!</Typography>
                                        </div>
                                        : supervisorReqStatus === "Accept" && coSupervisorReqStatus === "Pending" ?
                                            <CoSuperSubmissionStatus groupId={groupName} />
                                            : supervisorReqStatus === "Accept" && coSupervisorReqStatus === "Reject" ?
                                                <>
                                                    <div className='info-message-reject'>
                                                        <Typography variant='h5'>Your request have been rejected by co-supervisor, please re-submit request!</Typography>
                                                    </div>
                                                    <CoSuperSubmissionStatus groupId={groupName} />
                                                </>
                                                : supervisorReqStatus === "Accept" && coSupervisorReqStatus === "Accept" ?
                                                    <>
                                                        < div className='info-message-complete'>
                                                            <Typography variant='h5'>Your request have been rejected by co-supervisor, please re-submit request!</Typography>
                                                        </div>
                                                        <CoSuperSubmissionStatus groupId={groupName} />
                                                    </>
                                                    : null
                            }
                        </TabPanel>

                    </TabContext>
                </Box>
            </Grid>
        </Container >
    )
}

export default TopicsTabView