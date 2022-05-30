import { Box, Card, Grid } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import DisplayGroupDetails from "./DisplayGroupDetails";
import { BASE_URL } from "../../constants";
import { margin } from "@mui/system";
import axios from "axios";

const StudentGroups = () => {
  const [groupDetails, setGroupDetails] = React.useState([]);

  React.useEffect(() => {
    fetchGroupUserNames();
  }, []);

  const fetchGroupUserNames = async () => {
    await axios
      .get(`${BASE_URL}/groups/`)
      .then((response) => {
        setGroupDetails(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [value, setValue] = React.useState("1");
  console.log(groupDetails);
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
              {groupDetails ? (
                groupDetails.map((item, index) => (
                  <DisplayGroupDetails
                    key={index}
                    groupObjId={item._id}
                    GroupId={item.groupName}
                    supervisorName={
                      item.supervisorId
                        ? item.supervisorId.fullName
                        : "Not Assigned"
                    }
                    coSupervisorName={
                      item.coSupervisorId
                        ? item.coSupervisorId.fullName
                        : "Not Assigned"
                    }
                    pMembers={item.panelMemberIds ? item.panelMemberIds : []}
                    students={item.studentIds ? item.studentIds : []}
                  />
                ))
              ) : (
                <label>No Groups registered yet</label>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default StudentGroups;
