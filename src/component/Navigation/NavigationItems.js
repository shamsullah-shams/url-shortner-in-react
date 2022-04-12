import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./NavigationItems.css";

const navigationItems = (props) => {
    return (
        <div>
            <ul className="NavigationItems">
                <NavigationItem>My Urls</NavigationItem>
                <NavigationItem onClick={props.signin}>Sign in</NavigationItem>
                <NavigationItem onClick={props.signup}>Sign up</NavigationItem>
            </ul>
            <ToggleButton />
        </div>
    )
};


export default navigationItems;