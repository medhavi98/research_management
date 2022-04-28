import React, {Component} from "react";
import Button from "./components/pasindu/Button";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import registration from "./components/lakshika/registration";

export default class App extends Component{
    render(){
        return (
        <div>
            {/* <Registration/> */}
            <Router>
                <Route path='/' component={registration}/>
            </Router>
        </div>
        )
    }
}