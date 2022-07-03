import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = (props) => {
    return (
        <div>
            <ul className={props.className}>
                {
                    props.isAuthenticated ?
                        <>
                            <NavigationItem onClick={props.myurls}>My Urls</NavigationItem>
                            <NavigationItem onClick={props.logout}>Logout</NavigationItem>
                        </>
                        :
                        <>
                            <NavigationItem onClick={props.signin}>Sign in</NavigationItem>
                            <NavigationItem onClick={props.signup}>Sign up</NavigationItem>
                        </>
                }
            </ul>
        </div>
    )
};


export default navigationItems;