import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Card, Grid } from "@mui/material";
import GroupDetails from "./GroupDetails";
import BlindGroups from "./BlindGroups";
import { BASE_URL } from "../../constants";
import axios from "axios";
import * as React from "react";
import { getUserSessionDetails } from '../../../helpers/userSessionHandler'

const Groups = () => {
  const [value, setValue] = React.useState("1");
  const [groupDetails, setGroupDetails] = React.useState([]);
  const [blindGroups, setBlindGroups] = React.useState([]);
  const { userId } = getUserSessionDetails();

  React.useEffect(() => {
    fetchGroupUserNames();
    fetchBlindGroups();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event.target.value);
    console.log(newValue + "newValue");
  };

  const fetchGroupUserNames = async () => {
    const response = await axios.get(`${BASE_URL}/groups/getGroupsBySupervisorId/${userId}`);
    setGroupDetails(response.data.groups);
  };

  const fetchBlindGroups = async () => {
    const response = await axios.get(`${BASE_URL}/groups/getGroupsByBlindReviewerId/${userId}`);
    console.log(response.data.groups);
    setBlindGroups(response.data.groups);
  };

  const DummyData = [
    {
      type: "student",
      name: "ishanka",
    },
    {
      type: "staff",
      name: "lalith",
    },
    {
      type: "student",
      name: "Charith",
    },
    {
      type: "staff",
      name: "Pasindu",
    },
  ];

  const tab1HandleClickOpen = () => { };

  const tab2HandleClickOpen = () => {
    console.log("tab2HandleClickOpen");
  };
  return (
    <Card>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Groups" value="1" />
              <Tab label="blind Groups" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {groupDetails ? (
              groupDetails.map((item, index) => (
                <GroupDetails
                  key={index}
                  groupObjId={item._id}
                  GroupId={item.groupName}
                  supervisorName={
                    item.blindReviewerId
                      ? item.blindReviewerId.fullName
                      : "Not Assigned"
                  }
                  coSupervisorName={
                    item.coSupervisorId
                      ? item.coSupervisorId.fullName
                      : "Not Assigned"
                  }
                  blindReviewer={item.blindReviewerId}
                  pMembers={item.panelMemberIds ? item.panelMemberIds : []}
                  students={item.studentIds ? item.studentIds : []}
                  fetchGroupUserNames={fetchGroupUserNames}
                />
              ))
            ) : (
              <label>No Groups registered yet</label>
            )}
          </TabPanel>
          <TabPanel value="2">

            {blindGroups ? (
              blindGroups.map((item, index) => (
                <BlindGroups GroupId={item.groupName} />
              ))
            ) : (
              <label>No Groups registered yet</label>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

const UserDetailsCard = ({ name, onUpdatePress, onDeletePress, onClick }) => {
  const commonStyles = {
    borderLeft: 5,
    borderLeftColor: "#9cbcff",
  };

  const [RNumber, setRNumber] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [sliitMail, setSliitMail] = React.useState("");
  const [personalEmail, setPersonalEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  return (
    <Card sx={{ ...commonStyles, mt: 2 }} onClick={onClick}>
      <Grid m={3}>
        <Grid container>
          <Grid item md={8}>
            {name}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Groups;
