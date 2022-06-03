import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Card, Grid } from "@mui/material";
import AdminDocument from "./AdminDocument";
import StudentDocuments from "./StudentDocuments";

const DownloadDocument = () => {
  const [value, setValue] = React.useState("1");
  const [users, setUsers] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event.target.value);
    console.log(newValue + "newValue");
  };

  const tab1HandleClickOpen = () => {};

  const tab2HandleClickOpen = () => {
    console.log("tab2HandleClickOpen");
  };

  return (
    <Card>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Student Docs" value="1" />
              <Tab label="Admin Docs" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <StudentDocuments />
          </TabPanel>
          <TabPanel value="2">
            <AdminDocument />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

export default DownloadDocument;
