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
                <h1 className="Heading">Important !</h1>
                    <button className="Heading">{props.username}</button>
                    <p>This is your username please remember it and next time sign in with this user name and we will give you your history</p>
                <button className="OK">OK</button>
            </div>
        </Aux>
    )
};

export default copyForm;