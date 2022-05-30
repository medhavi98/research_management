import React from 'react';
import {
    Container,
    Box,
    Button,
    CardMedia,
    Grid,
    Item,
    Typography,
    Card,
    Tab
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TopicRegister from './TopicRegister';
import SubmissionStatus from './SubmissionStatus';

const TopicsTabView = () => {

    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Grid mb={10} md={12} xs={12}>
                    <div sx={{ width: '950px', padding: '10px'}}>
                        <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={value}>
                                <Box sx={{ 
                                    bgcolor: "background.paper",
                                    boxShadow: '0 6px 20px rgba(56, 125, 255, 0.17)',
                                    borderRadius: '10px',
                                    width: '950px'
                                }}>
                                    <TabList   
                                        centered                                     
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab sx={{ml: '5%', mr: '5%'}} label="Register Topic" value="1" />
                                        <Tab sx={{ml: '5%', mr: '5%'}} label="Submission Status" value="2" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <TopicRegister />
                                </TabPanel>
                                <TabPanel value="2">
                                    <SubmissionStatus />
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </div>
            </Grid>
        </Container>
    )
}

export default TopicsTabView