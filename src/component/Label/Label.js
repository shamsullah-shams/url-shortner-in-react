import React from "react";
import "./Label.css";

const label = (props) => {
    return (
        <label className="Label">{props.children}</label>
    )
}

export default label;