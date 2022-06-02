import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button, Card, Grid } from "@mui/material";
import FormDialog from "../../Common/FormDialog";
import axios from 'axios';
import { BASE_URL } from '../../constants'
// import GroupDetailsInputs from "../../Student/GroupDetails/GroupDetailsInputs";
import UpdateUserDetails from "./UpdateUserDetails";

const UserTabs = () => {
  const [value, setValue] = React.useState("1");
  const [users, setUsers] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event.target.value);
    console.log(newValue + "newValue");
  };

  React.useEffect(() => {
    fetchData();
  }, []);

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

  const fetchData = async () => {
    const response = await axios.get(`${BASE_URL}/user/getAllUserDetails`);
    setUsers(response.data.users)
  }

  const onDeletePress = async id => {
    const response = await axios.delete(`${BASE_URL}/user/deleteUser/${id}`)
    if (response.data.user) {
      const res = await axios.get(`${BASE_URL}/user/getAllUserDetails`);
      setUsers(res.data.users)
    } else {
      alert("❌ Couldn't delete the user. Please try again.");
    }
  }
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
            {users.map((user, index) => {
              if (user.userType === "student") {
                return (
                  <UserDetailsCard
                    id={user._id}
                    name={user.fullName}
                    onClick={tab1HandleClickOpen}
                    RNumber={user.studentId}
                    sliitMail={user.sliitEmail}
                    pEmail={user.personalEmail}
                    phone={user.phone}
                    onDeletePress={() => onDeletePress(user._id)}
                  />
                );
              }
            })}
          </TabPanel>
          <TabPanel value="2">
            {users.map((user, index) => {
              if (user.userType === "staff") {
                return (
                  <UserDetailsCard
                    id={user._id}
                    name={user.fullName}
                    onClick={tab2HandleClickOpen}
                    RNumber={user.staffId}
                    sliitMail={user.sliitEmail}
                    pEmail={user.personalEmail}
                    phone={user.phone}
                    onDeletePress={() => onDeletePress(user._id)}
                  />
                );
              }
            })}
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  );
};

const UserDetailsCard = ({ id, name, onUpdatePress, onDeletePress, onClick, RNumber, sliitMail, pEmail, phone }) => {
  const [personalEmail, setPersonalEmail] = React.useState(pEmail);
  const [phoneNumber, setPhoneNumber] = React.useState(phone);

  const commonStyles = {
    borderLeft: 5,
    borderLeftColor: "#9cbcff",
  };

  const onUserUpdate = async e => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}/user/editUserDetails/${id}`, {
      personalEmail,
      phone: phoneNumber
    })
    if (!response.data.user) {
      alert("❌ Couldn't update user details. Please try again.")
    }
  }

  return (
    <Card sx={{ ...commonStyles, mt: 2 }} onClick={onClick}>
      <Grid m={3}>
        <Grid container>
          <Grid item md={8}>
            {name}
          </Grid>
          <Grid item md={2}>
            <FormDialog
              testButton="Update"
              Description="Update Details"
              onButtonPress={() => {
                console.log("Close dialog box")
              }}
              children={
                <UpdateUserDetails
                  RNumber={RNumber}
                  sliitMail={sliitMail}
                  personalEmail={personalEmail}
                  phoneNumber={phoneNumber}
                  setPersonalEmail={setPersonalEmail}
                  setPhoneNumber={setPhoneNumber}
                  fullName={name}
                  onSubmit={e => onUserUpdate(e)}
                />
              }
            />
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
