import React from "react";
import "./ToggleButton.css";


const toggleButton = (props) => {
    return (
        <div onClick={props.onClick} className="ToogleButton">
            <div className="ToogleButton-Bars"></div>
            <div className="ToogleButton-Bars"></div>
            <div className="ToogleButton-Bars"></div>
        </div>
    )
};


export default toggleButton;