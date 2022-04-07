import React from "react";
import "./NavigationItem.css";

const navigationItem = (props) => {
    return (
        <li className="NavigationItem">{props.children}</li>
    )
};


export default navigationItem;