import React from "react";
import Popup from "./Popup";

const copyForm = (props) => {

    let classess = 'Hide';
    if (props.show) {
        classess = '';
    }

    // @@ if user clicked copy button ----so copy the short url----
    const copyShortUrl = async () => {
        const copyText = document.getElementById("CopyText");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        await navigator.clipboard.writeText(copyText.value);
    }


    return (
        <div className={classess}>
            <Popup cancel={props.cancel}>
                <div>
                    <h1 className="Heading">Copy URL</h1>
                    <hr />
                    <input id="CopyText" readOnly type="text" value={props.value} className="CopyInput" />
                    <div className="Button">
                        <span onClick={props.copy}><button onClick={copyShortUrl} className="SignInSubmit" >Copy</button></span>
                        <button onClick={props.cancel} className="SignInCancel">Cancel</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
};

export default copyForm;