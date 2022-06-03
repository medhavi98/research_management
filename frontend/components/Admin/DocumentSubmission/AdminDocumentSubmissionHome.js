import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Card, Grid } from "@mui/material";
import FormDialog from "../../Common/FormDialog";
import axios from "axios";
import { BASE_URL } from "../../constants";
import Resources from "./AdminDocSubmission";
import AdminDocSubmission from "./AdminDocSubmission";
import AdminDocSubmissions from "./AdminDocSubmissions";
import SubmittedDocView from "./SubmittedDocView";

const AdminDocumentSubmissionHome = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event.target.value);
    console.log(newValue + "newValue");
  };
  return (
    <Card>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Submissions" value="1" />
              <Tab label="Recent Document Submission" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AdminDocSubmissions />
          </TabPanel>
          <TabPanel value="2">
            <SubmittedDocView />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

export default AdminDocumentSubmissionHome;
