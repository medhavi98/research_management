import React, {Component} from "react";
import Button from "./components/pasindu/Button";
import { Route, BrowserRouter ,Routes } from "react-router-dom";
import Registration from './components/lakshika/Registration'

export default class App extends Component{
    render(){
        return (
        <div className="App">
            {/* <Registration/> */}
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<Registration />} />
                </Routes>
            </BrowserRouter>
            
        </div>
        )
    }
}