import React from "react";
import "./Popup.css";

const popup = (props) => {
    return (
        <div className="Manage">
            <div className="OriginalPopup">
                <div onClick={props.cancel} className="OriginalPopupCROSS">X</div>
                <div className="Display">
                        {props.children}
                </div>
            </div>
        </div>
    )
}

export default popup;