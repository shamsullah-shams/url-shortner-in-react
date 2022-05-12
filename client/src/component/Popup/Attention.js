import React from "react";
import Popup from "./Popup";

const copyForm = (props) => {


    let classess = 'Hide';
    if(props.show) {
        classess = '';
    }

    return (
        <div className={classess}>
            <Popup cancel={props.ok}>
                <div>
                    <div className="Display">
                        <h1>Important !</h1>
                        <p>{props.message}</p>
                        <button onClick={props.ok} className="OK">OK</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default copyForm;