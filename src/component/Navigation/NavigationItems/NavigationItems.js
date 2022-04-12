import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = (props) => {
    return (
        <div>
            <ul className="NavigationItems">
                <NavigationItem>My Urls</NavigationItem>
                <NavigationItem onClick={props.signin}>Sign in</NavigationItem>
                <NavigationItem onClick={props.signup}>Sign up</NavigationItem>
            </ul>
        </div>
    )
};


export default navigationItems;