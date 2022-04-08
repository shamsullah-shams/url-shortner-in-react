import React from "react";
import QRCode from "qrcode.react";


const generatingQRCode = (props) => {

    return (
        <QRCode value={props.value} />
    )
};


export default generatingQRCode;