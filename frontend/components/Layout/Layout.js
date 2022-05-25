import React, { useEffect, useState } from "react";
import AppNavigation from "../NavigationBar/AppNavigation";
import TopicRegister from "../Student/TopicSubmission/TopicRegister";
import GroupDetails from "../Student/GroupDetails";
import DashBoard from "../DashBoard";
import DocumentSubmission from "../Student/DocumentSubmission/DocumentSubmission";
import "../../Main.scss";
import { getUserSessionDetails } from "../../helpers/userSessionHandler";
import axios from "axios";
import { BASE_URL } from "../constants";
import StudentGroups from "../Admin/DocumentSubmission/StudentGroups/StudentGroups";

const Layout = ({ children }) => {
  const [focus, setFocus] = useState("Dashboard");
  const [userType, setUserType] = useState("admin");
  const student = [
    "Dashboard",
    "Group details",
    "Topic submission",
    "Document submission",
    "Chat",
  ];
  const admin = ["Dashboard", "Users", "Student groups", "Documents"];
  const staff = ["Dashboard", "Student requests", "Group marks", "Chat"];
  const { userId } = getUserSessionDetails();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const user = await axios.get(`${BASE_URL}/user/userDetails/${userId}`);
    setUserType(user.data.user.userType);
  };

  const onClick = (componentName) => {
    console.log("click", componentName);
    setFocus(componentName);
  };
  return (
    <div className="root">
      <AppNavigation
        onClickItem={onClick}
        menuItems={
          userType === "admin" ? admin : userType === "staff" ? staff : student
        }
      />
      <main className="children-wrapper" style={{ marginTop: "10%" }}>
        {focus === "Dashboard" ? <DashBoard /> : ""}
        {/* {Admin} */}
        {focus === "Student groups" ? <StudentGroups /> : ""}

        {/* {Staff} */}

        {/* {Student} */}
        {focus === "Topic submission" ? <TopicRegister /> : ""}
        {focus === "Group details" ? <GroupDetails /> : ""}
        {focus === "Document submission" ? <DocumentSubmission /> : ""}
      </main>
    </div>
  );
};

export default Layout;
