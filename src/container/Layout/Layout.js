import React from "react";
import NavigationItems from "../../component/Navigation/NavigationItems/NavigationItems";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Logo from "../../component/Logo/Logo";
import SignIn from "../../component/Popup/Signin";
import ToggleButton from "../../component/Navigation/ToggleButton/ToggleButton";
import SideDrawer from "../../component/Navigation/SideDrawer/Sidedrawer";
import Signup from "../../component/Popup/Signup";
import './Layout.css';

class Layout extends React.Component {

    state = {
        showBackdrop : false,
        showSignupForm : false,
        showSignin : false,
        showSideDrawer : false,
        username : '',
    }

    showSignupFormHandler = () => {
        this.setState({showBackdrop : true , showSignupForm : true ,showSignin : false , showSideDrawer : false});
    }
    
    closeBackDropHandler = () => {
        this.setState({showBackdrop : false, showSignupForm : false, showSignin : false, showSideDrawer : false});
    }

    onChangeHandler = (event) => {
        this.setState({username : event.target.value});
    }

    onSubmitHandler = () => {
        console.log(this.state.username);
    }

    onCancelHandler = () => {
        this.setState({showBackdrop : false , showSignupForm : false ,showSignin : false , showSideDrawer : false});
    }

    showSigninFormHandler = () => {
        this.setState({showBackdrop : true , showSignupForm : false ,showSignin : true , showSideDrawer : false});
    }

    showSideDrawerHandler = () => {
        this.setState({showBackdrop : true , showSignupForm : false ,showSignin : false , showSideDrawer : true});
    }

    render() {
        return (
            <div>
                <SideDrawer show={this.state.showSideDrawer} signin={this.showSigninFormHandler} signup={this.showSignupFormHandler}/>
                <Backdrop show={this.state.showBackdrop} onClick={this.closeBackDropHandler} />
                <Signup className="Signup" show={this.state.showSignupForm} cancel={this.closeBackDropHandler} />
                <SignIn onChange={this.onChangeHandler} onSubmit={this.onSubmitHandler} cancel={this.onCancelHandler} show={this.state.showSignin} />
                <div className="Layout">
                    <Logo />
                    <NavigationItems className="ToolbarNavigationItems" signin={this.showSigninFormHandler} signup={this.showSignupFormHandler}/>
                    <ToggleButton onClick={this.showSideDrawerHandler} />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default Layout;