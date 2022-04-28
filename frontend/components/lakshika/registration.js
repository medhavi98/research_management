import React , {Component} from "react";

class registration extends Component { 
      render() {
        return (
            <div className="container">
                <h3>Create an Account</h3> 

                <input
                    type={"text"}                    
                    placeholder={"Enter Your Full Name Here"}
                />
            </div>
        )
    }
}
 export default registration;