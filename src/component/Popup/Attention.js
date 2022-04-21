import React from "react";
import Popup from "./Popup";

const copyForm = (props) => {


    let classess = 'Hide';
    if(props.show) {
        classess = '';
    }

    return (
        <div className={classess}>
            <Popup>
                <div>
                    <div className="Display">
                        <h1>Important !</h1>
                            <button className="Important">{props.username}</button>
                            <p>In the red box you can see your user name please remember it and next time use it</p>
                        <button onClick={props.ok} className="OK">OK</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default copyForm;