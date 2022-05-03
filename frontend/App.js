import React, {Component} from "react";
import Button from "./components/pasindu/Button";
import registration from "./components/lakshika/registration";
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import Dashboard from "./components/charith/Dashboard";
export default class App extends Component{
    render(){
        return (
        <div>
            {/* <Registration/> */}
            <Router>
                <Routes>
                    <Route path='/' element={<registration />}/>
                    <Route path='/dashboard' element={<Dashboard />}/>
                </Routes>
            </Router>
        </div>
        )
    }
}