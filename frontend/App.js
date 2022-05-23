import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/DashBoard";
import TopicRegister from "./components/Student/TopicSubmission/TopicRegister";
import AdminDashboard from "./components/Admin/DocumentsUpload/AdminDocUpload"
import "./Main.scss";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Registration/> */}
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/admindoc" element={<Admindoc />} />
              <Route exact path="/" element={
                <Layout>
                  <Dashboard />
                </Layout>} 
              />
              <Route exact path="/register_topic" element={
                <Layout>
                  <TopicRegister />
                </Layout>} 
              />
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
