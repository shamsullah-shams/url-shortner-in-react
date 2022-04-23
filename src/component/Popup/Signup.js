import React from "react";
import Popup from "./Popup";
import "./Popup.css";


const signup = (props) => {

    let classess = 'Hide';
    if(props.show) {
        classess = '';
    }

    return (
        <div className={classess}>
            <Popup cancel={props.cancel}>
                <div className="Display">
                    <h1 className="Heading">Sign Up</h1>
                    <hr/>
                    <label>Enter Name</label>
                    <input onChange={props.onChange} type="text"  placeholder="Enter Name" name="signupName" />
                    <label>Enter Email</label>
                    <input onChange={props.onChange} type="email"  placeholder="Enter Email" name="signupEmail" />
                    <label>Enter Password</label>
                    <input onChange={props.onChange} type="password" name="signupPassword" placeholder="Enter Password" />
                    <div className="Button">
                            <button onClick={props.onSubmit} className="SignInSubmit" >Submit</button>
                            <button onClick={props.cancel} className="SignInCancel">Cancel</button>
                        </div>
                </div>
            </Popup>
        </div>
    )
}


export default signup;