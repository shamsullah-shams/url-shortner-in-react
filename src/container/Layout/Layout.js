import React from "react";
import Aux from "../../hoc/Auxx";
import NavigationItems from "../../component/Navigation/NavigationItems";
import Backdrop from "../../UI/Backdrop/BackDrop";
import Logo from "../../component/Logo/Logo";
import './Layout.css';

class Layout extends React.Component {

    state = {
        showBackdrop : false,
    }


    render() {
        return (
            <Aux>
                <Backdrop show={this.state.showBackdrop} />
                <div className="Layout">
                    <Logo />
                    <NavigationItems/>
                </div>
                <div>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}


export default Layout;