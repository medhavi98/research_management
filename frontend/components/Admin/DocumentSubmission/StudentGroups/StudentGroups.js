import { Box, Card, Grid } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import DisplayGroupDetails from "./DisplayGroupDetails";
import { BASE_URL } from '../../../constants'
import { margin } from "@mui/system";
import axios from 'axios'

const StudentGroups = () => {
  // const groupDetails = [
  //   {
  //     id: "627f89e9ea2421bf3c457f42",
  //     supervisorName: "Lakshika",
  //     coSupervisorName: "Lalith",
  //     pMembers: ["Kamal", "Nimal", "Sunimal"],
  //     students: ["supun", "pathum", "saman", "sajth"],
  //   },
  //   {
  //     id: "627f89e9ea2421bf3c457f42",
  //     supervisorName: "Lakshika",
  //     coSupervisorName: "Lalith",
  //     pMembers: ["Kamal", "Nimal", "Sunimal"],
  //     students: ["supun", "pathum", "saman", "sajth"],
  //   },
  // ];
  const [groupDetails, setGroupDetails] = React.useState([]);

  React.useEffect(() => {
    fetchGroupUserNames();
  }, [])

  const fetchGroupUserNames = async () => {
    const response = await axios.get(`${BASE_URL}/user/userDetails`);
    setGroupDetails(response.data.userNames);
    console.log(response)
  };
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Card>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Student Groups" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {groupDetails.map((item, index) => (
                <DisplayGroupDetails
                  key={index}
                  GroupId={item.groupName}
                  supervisorName={item.supervisorName}
                  coSupervisorName={item.coSupervisorName}
                  pMembers={item.panelMemberNames}
                  students={item.studentNames}
                />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default StudentGroups;
