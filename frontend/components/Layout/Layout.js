import React, { useState } from "react";
import AppNavigation from "../NavigationBar/AppNavigation";
import TopicRegister from "../Student/TopicSubmission/TopicRegister";
import GroupDetails from "../Student/GroupDetails";
import DashBoard from "../DashBoard";
import DocumentSubmission from "../Student/DocumentSubmission/DocumentSubmission";

const Layout = ({ children }) => {
  const [focus, setFocus] = useState("Dashboard");
  const onClick = (componentName) => {
    console.log("click", componentName);
    setFocus(componentName);
  };
  return (
    <div className="root">
      <AppNavigation onClickItem={onClick} />
      <main className="children-wrapper">
        {/* {children} */}
        {focus === "Dashboard" ? <DashBoard /> : ""}
        {focus === "Group Details" ? <GroupDetails /> : ""}
        {focus === "Topic Submission" ? <TopicRegister /> : ""}
        {focus === "Document Submission" ? <DocumentSubmission /> : ""}
      </main>
    </div>
  );
};

export default Layout;
