import React from "react";
import "./Popup.css";

const popup = (props) => {
    return (
        <div className="OriginalPopup">
            <div className="OriginalPopupCROSS">X</div>
            <div className="Display">
                    {props.children}
            </div>
        </div>
    )
}

export default popup;