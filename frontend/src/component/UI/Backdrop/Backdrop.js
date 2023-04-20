import React from "react";
import "./Backdrop.css";

const backdrop = (props) => {


    let classNames = ['Backdrop', 'Close'];
    if (props.show) {
        classNames = ['Backdrop', 'Open'];
    }

    return (
        <div onClick={props.onClick} className={classNames.join(' ')}></div>
    )
};

export default backdrop;