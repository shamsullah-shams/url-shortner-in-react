import React from "react";
import Aux from "../../hoc/Auxx";
import NavigationItems from "../../component/Navigation/NavigationItems";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Logo from "../../component/Logo/Logo";
import SignupForm from "../SignupForm/SignupForm";
import './Layout.css';

class Layout extends React.Component {

    state = {
        showBackdrop : false,
        showSignupForm : false,
    }

    showSignupFormHandler = () => {
        this.setState({showBackdrop : true , showSignupForm : true});
    }
    
    closeBackDropHandler = () => {
        this.setState({showBackdrop : false, showSignupForm : false});
    }

    render() {
        return (
            <Aux>

                <Backdrop show={this.state.showBackdrop} onClick={this.closeBackDropHandler} />
                <SignupForm className="Signup" show={this.state.showSignupForm} cancel={this.closeBackDropHandler} />

                <div className="Layout">
                    <Logo />
                    <NavigationItems signup={this.showSignupFormHandler}/>
                </div>
                <div>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}


export default Layout;