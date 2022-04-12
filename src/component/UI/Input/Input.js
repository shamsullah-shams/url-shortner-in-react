import React from "react";
import "./Input.css";

const input = (props) => {
    return (
        <input readOnly={props.readOnly} onChange={props.onChange} placeholder={props.placeholder} type={props.type} value={props.value}  className="Input" />
    )
};

export default input;