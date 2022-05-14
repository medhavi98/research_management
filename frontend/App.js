import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Registration from "./components/lakshika/Registration";
import Login from "./components/Auth/Login";
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
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
