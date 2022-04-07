import React from "react";
import ImageLogo from "../../assets/Logo.jpg";
import "./Logo.css";


const logo = () => (
    <div className="Logo">
        <img src={ ImageLogo } alt="URL Shortner" />
    </div>
);


export default logo;