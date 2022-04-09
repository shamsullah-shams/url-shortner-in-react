import React from "react";
import Aux from "../../hoc/Auxx";
import "./CopyURL.css";

const copyForm = (props) => {


    let classess = '';
    if(props.show) {
        classess = ['CopyURL' , 'Show']
    } else {
        classess = ['CopyURL' , 'Closed']
    }

    return (
        <Aux>
            <div className={classess.join(' ')}>
                <h1 className="Heading">Copy URL</h1>
                <hr /> 
                <input readOnly type="text" value={props.value} className="CopyInput" />
                <div className="Button">
                    <button onClick={props.copy} className="Original Copy">Copy</button>
                    <button onClick={props.cancel} className="Original Cancel">Cancel</button>
                </div>
            </div>
        </Aux>
    )
};

export default copyForm;