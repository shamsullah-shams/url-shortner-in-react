import React from "react";
import "./BackgroundImage.css";

const backgroundImage = (props) => {
    return (
        <div className='AllBody'>
            {props.children}
        </div>
    );
}

export default backgroundImage;