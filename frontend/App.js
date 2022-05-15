import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/DashBoard";
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
              <Route path="/" element={
                <Layout>
                  <Dashboard />
                </Layout>} 
              />
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
