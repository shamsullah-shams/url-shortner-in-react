import React from "react";
import "./Button.css";

const button = (props) => {
    return (
        <button onClick={props.onClick}  className={props.className}>{props.children}</button>
    )
}

export default button;