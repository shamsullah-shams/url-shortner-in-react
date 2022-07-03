import React from 'react';
import NavigationItems from "../NavigationItems/NavigationItems";
import './Sidedrawer.css';

const sideDrawer = (props) => {

    let classes = ['SideDrawer', 'Hide'];

    if (props.show) {
        classes = ['SideDrawer', 'Show'];
    }

    return (
        <div className={classes.join(' ')}>
            <NavigationItems
                signin={props.signin}
                signup={props.signup}
                myurls={props.myurls}
                logout={props.logout}
                isAuthenticated={props.isAuthenticated}
                className="SideDrawerNavigationItems" />
        </div>
    )
};

export default sideDrawer;