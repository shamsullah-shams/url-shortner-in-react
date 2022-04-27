import React from "react";
import axios from "axios";
import NavigationItems from "../../component/Navigation/NavigationItems/NavigationItems";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Logo from "../../component/Logo/Logo";
import SignIn from "../../component/Popup/Signin";
import ToggleButton from "../../component/Navigation/ToggleButton/ToggleButton";
import SideDrawer from "../../component/Navigation/SideDrawer/Sidedrawer";
import Signup from "../../component/Popup/Signup";
import Attention from "../../component/Popup/Attention";
import './Layout.css';

class Layout extends React.Component {

    state = {
        showBackdrop : false,
        showMessagePopup : false,
        message : '',
        showSignupForm : false,
        showSignin : false,
        showSideDrawer : false,
        accoutCreate : false,

        signinForm : {
            email: {
                value : '',
                validation : {
                    required : true,
                    minlength : 10,
                },
                valid : false,
                touched : false,
            },
            password: {
                value : '',
                validation : {
                    required : true,
                    minlength : 8,
                },
                valid : false,
                touched : false,
            },
        },
        signUpForm : {
            name: {
                value : '',
                validation : {
                    required : true,
                    minlength : 3,
                },
                valid : false,
                touched : false,
            },
            email:  {
                value : '',
                validation : {
                    required : true,
                    minlength : 10
                },
                valid : false,
                touched : false,
            },
            password: {
                value : '',
                validation : {
                    required : true,
                    minlength : 8,
                },
                valid : false,
                touched : false,
            },
        },

        signupFormIsValid : false,
        signinFormIsValid : false,
    }

    gettingSignInFormValuesHandler = (event) => {

        const updatedSigninForm = { ...this.state.signinForm };
        const updatedSigninFormEmail = { ...updatedSigninForm.email };
        const updatedSigninFormPassword = { ...updatedSigninForm.password };

        if(event.target.name === "signinEmail") {
            updatedSigninFormEmail.value = event.target.value;
            updatedSigninFormEmail.touched = true;
            updatedSigninFormEmail.valid = this.checkValidity(
                updatedSigninFormEmail.value, updatedSigninFormEmail.validation
            );
        }

        else if(event.target.name === "signinPassword") {
            updatedSigninFormPassword.value = event.target.value;
            updatedSigninFormPassword.touched = true;
            updatedSigninFormPassword.valid = this.checkValidity(
                updatedSigninFormPassword.value, updatedSigninFormPassword.validation
            );
        }

        updatedSigninForm.email = updatedSigninFormEmail;
        updatedSigninForm.password = updatedSigninFormPassword;

        const signinFormIsValid = updatedSigninFormEmail.valid && updatedSigninFormPassword.valid;

        this.setState({signinForm : updatedSigninForm, signinFormIsValid : signinFormIsValid})
       
    }

    submittingSigninFormHandler = async () => {

        const newuser = {};
        for(let identifier in this.state.signinForm) {
            newuser[identifier] = this.state.signinForm[identifier].value;
        }
        try {
            const result = await axios.post('http://localhost:8080/user/signin', newuser);
            this.setState({
                message : result.data.message,
                showMessagePopup : true,
                showBackdrop : true,
                showSignin : false
            });
            if(result.status === 201) {
                localStorage.setItem("userEmail" , newuser.email);
            }
        } catch (error) {
            
        }
        
    }

    signUpFormValuesHandler = (event) => {

        const updatedSignupForm = { ...this.state.signUpForm };
        const updatedSignupFormName = { ...updatedSignupForm.name };
        const updatedSignupFormEmail = { ...updatedSignupForm.email };
        const updatedSignupFormPassword = { ...updatedSignupForm.password };

        if(event.target.name === "signupName") {
            updatedSignupFormName.value = event.target.value;
            updatedSignupFormName.touched = true;
            updatedSignupFormName.valid = this.checkValidity(
                updatedSignupFormName.value, updatedSignupFormName.validation
            );
        } 
        else if(event.target.name === "signupEmail") {
            updatedSignupFormEmail.value = event.target.value;
            updatedSignupFormEmail.touched = true;
            updatedSignupFormEmail.valid = this.checkValidity(
                updatedSignupFormEmail.value, updatedSignupFormEmail.validation
            );
        }
        else if(event.target.name === "signupPassword") {
            updatedSignupFormPassword.value = event.target.value;
            updatedSignupFormPassword.touched = true;
            updatedSignupFormPassword.valid = this.checkValidity(
                updatedSignupFormPassword.value, updatedSignupFormPassword.validation
            );
        }

        const signupFormIsValid = updatedSignupFormName.valid && updatedSignupFormEmail.valid && updatedSignupFormPassword.valid;

        updatedSignupForm.name = updatedSignupFormName;
        updatedSignupForm.email = updatedSignupFormEmail;
        updatedSignupForm.password = updatedSignupFormPassword;

        this.setState({signUpForm : updatedSignupForm , signupFormIsValid : signupFormIsValid});
    }

    checkValidity(value , rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minlength) {
            isValid = value.length >= rules.minlength && isValid;
        }

        return isValid;
    }

    submitSignupFormHandler = async () => {

        const newuser = {};

        for(let identifier in this.state.signUpForm) {
            newuser[identifier] = this.state.signUpForm[identifier].value;
        }
        const result = await axios.post('http://localhost:8080/user/signup' , newuser);
        console.log(result)
        this.setState({
            message : result.data.message,
            showMessagePopup : true,
            showBackdrop : true,
            showSignupForm : false
        });
         

    }

    showSignupFormHandler = () => {
        this.setState({
            showBackdrop : true,
            showSignupForm : true,
            showSignin : false,
            showSideDrawer : false
        });
    }

    onCancelHandler = () => {
        this.setState({
            showBackdrop : false, 
            showSignupForm : false,
            showSignin : false,
            showSideDrawer : false,
            showMessagePopup : false,
            message : null,
        });
    }

    showSigninFormHandler = () => {
        this.setState({
            showBackdrop : true, 
            showSignupForm : false,
            showSignin : true, 
            showSideDrawer : false
        });
    }

    showSideDrawerHandler = () => {
        this.setState({
            showBackdrop : true, 
            showSignupForm : false,
            showSignin : false,
             showSideDrawer : true
        });
    }

    render() {
        return (
            <div>
                <Attention 
                    show={this.state.showMessagePopup} 
                    ok={this.onCancelHandler}
                    message={this.state.message} 
                />
                <SideDrawer 
                    show={this.state.showSideDrawer} 
                    signin={this.showSigninFormHandler} 
                    signup={this.showSignupFormHandler}
                />
                <Backdrop 
                    show={this.state.showBackdrop} 
                    onClick={this.onCancelHandler} 
                />
                <Signup 
                    show={this.state.showSignupForm} 
                    cancel={this.onCancelHandler} 
                    onChange={(event) => { this.signUpFormValuesHandler(event)}} 
                    onSubmit={this.submitSignupFormHandler}
                    nameInvalid={!this.state.signUpForm.name.valid} 
                    emailInvalid={!this.state.signUpForm.email.valid} 
                    passwordInvalid={!this.state.signUpForm.password.valid}
                    nameTouched={this.state.signUpForm.name.touched}
                    emailTouched={this.state.signUpForm.email.touched}
                    passwordTouched={this.state.signUpForm.password.touched}
                    disabled={!this.state.signupFormIsValid}
                />
                <SignIn 
                    show={this.state.showSignin} 
                    cancel={this.onCancelHandler} 
                    onChange={this.gettingSignInFormValuesHandler} 
                    onSubmit={this.submittingSigninFormHandler}
                    emailInvalid={!this.state.signinForm.email.valid} 
                    emailTouched={this.state.signinForm.email.touched}
                    passwordInvalid={!this.state.signinForm.password.valid}
                    passwordTouched={this.state.signinForm.password.touched}
                    disabled={!this.state.signinFormIsValid}
                />
                <div className="Layout">
                    <Logo />
                    <NavigationItems 
                        className="ToolbarNavigationItems" 
                        signin={this.showSigninFormHandler} 
                        signup={this.showSignupFormHandler}
                    />
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