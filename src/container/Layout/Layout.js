import React from "react";
import NavigationItems from "../../component/Navigation/NavigationItems/NavigationItems";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Logo from "../../component/Logo/Logo";
import SignupForm from "../SignupForm/SignupForm";
import SignIn from "../../component/Signin/Signin";
import './Layout.css';

class Layout extends React.Component {

    state = {
        showBackdrop : false,
        showSignupForm : false,
        showSignin : false,
        username : '',
    }

    showSignupFormHandler = () => {
        this.setState({showBackdrop : true , showSignupForm : true});
    }
    
    closeBackDropHandler = () => {
        this.setState({showBackdrop : false, showSignupForm : false, showSignin : false});
    }

    onChangeHandler = (event) => {
        this.setState({username : event.target.value});
    }

    onSubmitHandler = () => {
        console.log(this.state.username);
    }

    onCancelHandler = () => {
        this.setState({showBackdrop : false , showSignin : false})
    }

    showSigninFormHandler = () => {
        this.setState({showBackdrop : true, showSignin : true});
    }

    render() {
        return (
            <div>
                <Backdrop show={this.state.showBackdrop} onClick={this.closeBackDropHandler} />
                <SignupForm className="Signup" show={this.state.showSignupForm} cancel={this.closeBackDropHandler} />
                <SignIn onChange={this.onChangeHandler} onSubmit={this.onSubmitHandler} cancel={this.onCancelHandler} show={this.state.showSignin} />

                <div className="Layout">
                    <Logo />
                    <NavigationItems signin={this.showSigninFormHandler} signup={this.showSignupFormHandler}/>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default Layout;