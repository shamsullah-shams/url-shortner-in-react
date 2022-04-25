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
                    <input 
                        onChange={props.onChange} 
                        className={props.nameInvalid && props.nameTouched ? "Invalid" : ''} 
                        type="text"  
                        placeholder="Enter Name" 
                        name="signupName" 
                    />
                    <label>Enter Email</label>
                    <input 
                        onChange={props.onChange} 
                        className={props.emailInvalid && props.emailTouched ? "Invalid" : ''} 
                        type="email"  
                        placeholder="Enter Email" 
                        name="signupEmail" 
                    />
                    <label>Enter Password</label>
                    <input 
                        onChange={props.onChange} 
                        className={props.passwordInvalid && props.passwordTouched ? "Invalid" : ''} 
                        type="password" 
                        name="signupPassword" 
                        placeholder="Enter Password" 
                    />
                    <div className="Button">
                            <button disabled={props.disabled}
                                onClick={props.onSubmit} 
                                className={props.disabled ? "Disabled" : "SignInSubmit"} >Submit</button>
                            <button 
                                onClick={props.cancel} 
                                className="SignInCancel">Cancel</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}


export default signup;