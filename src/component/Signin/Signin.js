import React from "react";
import "./Signin.css";

const signIn = (props) => {

    
    let classess = '';
    if(props.show) {
        classess = ['Signin' , 'Show']
    } else {
        classess = ['Signin' , 'Hide']
    }

    return (
        <div>
            <div className={classess.join(' ')}>
                <div className="Display">
                    <h1 className="Heading">Sing In</h1>
                    <hr/> 
                    <label>Enter User Name</label>
                    <input onChange={props.onChange} type="text" placeholder="Enter User Name" />
                    <div className="Button">
                        <button onClick={props.onSubmit} className="SignInSubmit" >Submit</button>
                        <button onClick={props.cancel} className="SignInCancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default signIn;