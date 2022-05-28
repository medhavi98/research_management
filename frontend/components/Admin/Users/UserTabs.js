import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Card, Grid } from "@mui/material";

const UserTabs = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event.target.value);
    console.log(newValue + "newValue");
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
  return (
    <Card>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", width: 1000 }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Student" value="1" />
              <Tab label="Staff" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            {DummyData.map((user, index) => {
              if (user.type === "student") {
                return <UserDetailsCard name={user.name} />;
              }
            })}
          </TabPanel>
          <TabPanel value="2">
            {DummyData.map((user, index) => {
              if (user.type === "staff") {
                return <UserDetailsCard name={user.name} />;
              }
            })}
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

const UserDetailsCard = ({ name, onUpdatePress, onDeletePress }) => {
  const onDisplayDataHandler = () => {
    console.log("display work");
  };
  return (
    <Card sx={{ mt: 2 }} onClick={onDisplayDataHandler}>
      <Grid m={3}>
        <Grid container>
          <Grid item md={8}>
            {name}
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" color="success" onClick={onUpdatePress}>
              Update
            </Button>
          </Grid>
          <Grid item md={2}>
            <Button variant="contained" color="error" onClick={onDeletePress}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserTabs;
