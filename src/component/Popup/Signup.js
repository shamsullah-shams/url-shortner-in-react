import React from "react";
import Popup from "./Popup";


const signup = (props) => {

    let classess = 'Hide';
    if(props.show) {
        classess = '';
    }

    return (
        <div className={classess}>
            <Popup>
                <div>
                    <h1 className="Heading">Sign Up</h1>
                    <hr /> 
                    <input type="text"  placeholder="Enter Name" name="name" className="CopyInput" />
                    <input type="email"  placeholder="Enter Email" name="email" className="CopyInput" />
                    <div className="Button">
                        <button  className="Original Copy">Submit</button>
                        <button  className="Original Cancel">Cancel</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}


export default signup;