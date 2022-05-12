import React from "react";
import Popup from "./Popup";

const signIn = (props) => {

    let classess = 'Hide';
    if(props.show) {
        classess = '';
    }

    return (
        <div className={classess}>
            <Popup cancel={props.cancel}>
                <div>
                    <div className="Display">
                        <h1 className="Heading">Sing In</h1>
                        <hr/> 
                        <label>Enter Email</label>
                        <input 
                            onChange={props.onChange} 
                            className={props.emailInvalid && props.emailTouched ? "Invalid" : ''} 
                            type="email"  
                            placeholder="Enter Email" 
                            name="signinEmail" 
                        />
                        <label>Enter Password atleast 8 character</label>
                        <input 
                            onChange={props.onChange} 
                            className={props.passwordInvalid && props.passwordTouched ? "Invalid" : ''} 
                            type="password" 
                            name="signinPassword" 
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
                </div>
            </Popup>
        </div>
    )
};

export default signIn;