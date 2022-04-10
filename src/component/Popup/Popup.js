import React from "react";
import Aux from "../../hoc/Auxx";
import "./Popup.css";

const copyForm = (props) => {


    let classess = '';
    if(props.show) {
        classess = ['Popup' , 'Show']
    } else {
        classess = ['Popup' , 'Hide']
    }

    return (
        <Aux>
            <div className={classess.join(' ')}>
                <div className="Display">
                    <h1>Important !</h1>
                        <button className="Important">{props.username}</button>
                        <p>In the red box you can see your user name please remember it and next time use it</p>
                    <button onClick={props.ok} className="OK">OK</button>
                </div>
            </div>
        </Aux>
    )
};

export default copyForm;