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
                    <hr /> 
                    <input type="text"  placeholder="Enter Name" name="name" className="CopyInput" />
                    <input type="email"  placeholder="Enter Email" name="email" className="CopyInput" />
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