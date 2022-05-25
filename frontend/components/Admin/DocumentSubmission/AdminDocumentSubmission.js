import { Box, Card } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AppBar from "@mui/material/AppBar";
import Resources from "./AdminDocSubmissions";
import Submissions from "./AdminResources";

const AdminDocumentSubmission = () => {
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
                <Tab label="Submissions" value="1" />
                <Tab label="Resources" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Resources />
            </TabPanel>
            <TabPanel value="2">
              <Submissions />
            </TabPanel>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default AdminDocumentSubmission;
