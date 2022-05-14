import React, { Component } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Registration from "./components/Auth/Registration";
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
