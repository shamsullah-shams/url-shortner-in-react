import React from "react";
import "./Button.css";

const button = (props) => {
    return (
        <button disabled={props.disabled}
            onClick={props.onClick}  
            className={props.disabled ? "DisabledButton" : props.className} >
                {props.children}
            </button>
    )
}

export default button;