import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import ToggleButton from "../ToggleButton/ToggleButton";
import "./NavigationItems.css";

const navigationItems = (props) => {
    return (
        <div>
            <ul className="NavigationItems">
                <NavigationItem>My Urls</NavigationItem>
                <NavigationItem>Sign in</NavigationItem>
                <NavigationItem>Sign up</NavigationItem>
            </ul>
            <ToggleButton />
        </div>
    )
};


export default navigationItems;