import React, { useEffect, useState } from "react";
import AppNavigation from "../NavigationBar/AppNavigation";
import InitialSubmission from "../Student/TopicSubmission/InitialSubmission";
import GroupDetails from "../Student/GroupDetails";
import DashBoard from "../DashBoard";
import DocumentSubmission from "../Student/DocumentSubmission/DocumentSubmission";
import "../../Main.scss";
import { getUserSessionDetails } from "../../helpers/userSessionHandler";
import axios from "axios";
import { BASE_URL } from "../constants";
import StudentGroups from "../Admin/StudentGroups/StudentGroups";
// import StudentGroups from "../Admin/DocumentSubmission/StudentGroups/StudentGroups";
import Messenger from "../Student/Chat/Messenger";
import { Container, Grid } from "@mui/material";
import UserTabs from "../Admin/Users/UserTabs";
import TopicsTabView from "../Student/TopicSubmission/TopicsTabView";
import StudentRequest from "../Staff/StudentsRequest/StudentRequest";
import AdminDocSubmission from "../Admin/DocumentSubmission/AdminDocSubmissions";
import StudentMarks from "../Staff/StudentsRequest/StudentMarks";
import Groups from "../Staff/Groups/Groups";
import DownloadDocument from "../Staff/DocumentDownload/DownloadDocument";
import AdminDocumentSubmissionHome from "../Admin/DocumentSubmission/AdminDocumentSubmissionHome";

const Layout = ({ children }) => {
  const [focus, setFocus] = useState("Dashboard");
  const [userType, setUserType] = useState("");
  const student = [
    "Dashboard",
    "Group details",
    "Topic submission",
    "Document submission",
    "Chat",
  ];
  const admin = ["Dashboard", "Users", "Student groups", "Documents Type"];
  const staff = [
    "Dashboard",
    "Student requests",
    "Groups",
    "Group marks",
    "Chat",
    "Documents",
  ];
  const { userId } = getUserSessionDetails();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await axios.get(
      `${BASE_URL}/user/getOneUserDetails/${userId}`
    );
    setUserType(user.data.user.userType);
  };

  const onClick = (componentName) => {
    console.log("click", componentName);
    setFocus(componentName);
  };
  return (
    <Container className="root">
      <Grid container>
        <Grid item md={2}>
          <AppNavigation
            onClickItem={onClick}
            menuItems={
              userType === "admin"
                ? admin
                : userType === "staff"
                ? staff
                : student
            }
          />
        </Grid>

        <Grid item md={10} sx={{ mt: 10 }}>
          <main className="children-wrapper">
            {focus === "Dashboard" ? <DashBoard /> : ""}
            {/* {Admin} */}
            {focus === "Student groups" ? <StudentGroups /> : ""}
            {focus === "Users" ? <UserTabs /> : ""}
            {focus === "Documents Type" ? <AdminDocumentSubmissionHome /> : ""}

            {/* {Staff} */}
            {focus === "Student requests" ? <StudentRequest /> : ""}
            {focus === "Groups" ? <Groups /> : ""}
            {focus === "Group marks" ? <StudentMarks /> : ""}
            {focus === "Documents" ? <DownloadDocument /> : ""}

            {/* {Student} */}
            {focus === "Topic submission" ? <TopicsTabView /> : ""}
            {focus === "Group details" ? <GroupDetails /> : ""}
            {focus === "Document submission" ? <DocumentSubmission /> : ""}
            {focus === "Chat" ? <Messenger /> : ""}
          </main>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
