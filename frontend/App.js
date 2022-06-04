import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/DashBoard";
import InitialSubmission from "./components/Student/TopicSubmission/InitialSubmission";
import "./Main.scss";
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import SubmissionsStd from "./components/Student/DocumentSubmission/Submissions";
import StudentDocuments from "./components/Staff/DocumentDownload/StudentDocuments";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Registration/> */}
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/register_topic"
              element={
                <Layout>
                  <InitialSubmission />
                </Layout>
              }
            />
            {/* Private routes */}
            //COMMENT :- routes that need to be logged in to be accessible
            <Route path="/" element={<PrivateRoute />}>
              <Route
                exact
                path="/"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route path="/stdsubmission" element={<SubmissionsStd />} />
            </Route>
            {/* Public routes */}
            //COMMENT :- routes that can be accessible without logged in
            <Route path="/" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
