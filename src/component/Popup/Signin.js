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
                        <label>Enter User Name</label>
                        <input onChange={props.onChange} type="text" placeholder="Enter User Name" />
                        <div className="Button">
                            <button onClick={props.onSubmit} className="SignInSubmit" >Submit</button>
                            <button onClick={props.cancel} className="SignInCancel">Cancel</button>
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default signIn;