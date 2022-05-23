import React, { useState } from "react";
import AppNavigation from "../NavigationBar/AppNavigation";
import TopicRegister from "../Student/TopicSubmission/TopicRegister";
import GroupDetails from "../Student/GroupDetails";

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
        {focus === "Dashboard" ? <h2>Dashboard</h2> : ""}
        {focus === "Group Details" ? <GroupDetails /> : ""}
        {focus === "Topic Submission" ? <TopicRegister /> : ""}
      </main>
    </div>
  );
};

export default Layout;
