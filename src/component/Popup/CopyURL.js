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
                    <h1 className="Heading">Copy URL</h1>
                    <hr /> 
                    <input readOnly type="text" value={props.value} className="CopyInput" />
                    <div className="Button">
                        <button onClick={props.copy} className="Original Copy">Copy</button>
                        <button onClick={props.cancel} className="Original Cancel">Cancel</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default copyForm;