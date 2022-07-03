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
import MyURLs from "../MyURLs/MyURLs";
import deleteMyUrls from "../../DeleteMyUrls";
import checkValidity from "../../checkValidity";
import Spinner from "../../component/UI/Spinner/Spinner";
import './Layout.css';

class Layout extends React.Component {
    // @@ container state
    state = {
        showSpinner: false,
        loadMyUrls: false,
        showBackdrop: false,
        showMessagePopup: false,
        message: '',
        showSignupForm: false,
        showSignin: false,
        showSideDrawer: false,
        accoutCreate: false,
        userLoggedIn: false,

        signinForm: {
            email: {
                value: '',
                validation: {
                    required: true,
                    minlength: 10,
                },
                valid: false,
                touched: false,
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minlength: 8,
                },
                valid: false,
                touched: false,
            },
        },
        signUpForm: {
            name: {
                value: '',
                validation: {
                    required: true,
                    minlength: 3,
                },
                valid: false,
                touched: false,
            },
            email: {
                value: '',
                validation: {
                    required: true,
                    minlength: 10
                },
                valid: false,
                touched: false,
            },
            password: {
                value: '',
                validation: {
                    required: true,
                    minlength: 8,
                },
                valid: false,
                touched: false,
            },
        },

        signupFormIsValid: false,
        signinFormIsValid: false,
        componentShouldUpdateOnce: 0,
    }

    // @@ when component renders
    componentDidMount() {
        const userLoggedIn = localStorage.getItem('urlShortnertoken') ?
            localStorage.getItem('urlShortnertoken') : false;
        if (userLoggedIn) {
            this.setState({ userLoggedIn: true });
        }
    }

    // @@ component did update method
    componentDidUpdate() {
        const userLoggedIn = localStorage.getItem('urlShortnertoken') ?
            localStorage.getItem('urlShortnertoken') : false;

        if (userLoggedIn) {
            console.log(userLoggedIn);
            if (this.state.componentShouldUpdateOnce === 0) {
                this.setState({ userLoggedIn: true, componentShouldUpdateOnce: 1 });
            }
        }

    }




    // @@ get sing in form values from inputs and set to state
    gettingSignInFormValuesHandler = (event) => {

        const updatedSigninForm = { ...this.state.signinForm };
        const updatedSigninFormEmail = { ...updatedSigninForm.email };
        const updatedSigninFormPassword = { ...updatedSigninForm.password };
        // @@ set email field
        if (event.target.name === "signinEmail") {
            updatedSigninFormEmail.value = event.target.value;
            updatedSigninFormEmail.touched = true;
            updatedSigninFormEmail.valid = checkValidity(
                updatedSigninFormEmail.value, updatedSigninFormEmail.validation
            );
        }
        // @@ set password field
        else if (event.target.name === "signinPassword") {
            updatedSigninFormPassword.value = event.target.value;
            updatedSigninFormPassword.touched = true;
            updatedSigninFormPassword.valid = checkValidity(
                updatedSigninFormPassword.value, updatedSigninFormPassword.validation
            );
        }
        // @@ to chain to the old key words of input fields
        updatedSigninForm.email = updatedSigninFormEmail;
        updatedSigninForm.password = updatedSigninFormPassword;

        const signinFormIsValid = updatedSigninFormEmail.valid && updatedSigninFormPassword.valid;

        this.setState({ signinForm: updatedSigninForm, signinFormIsValid: signinFormIsValid })

    }

    // @@ send request to the bachend if data of sign in is valid
    submittingSigninFormHandler = async () => {
        this.setState({ showSpinner: true });
        const newuser = {};
        // @@ get values from state and send to the backend
        for (let identifier in this.state.signinForm) {
            newuser[identifier] = this.state.signinForm[identifier].value;
        }
        try {
            const result = await axios.post('http://localhost:8080/user/signin', newuser);
            this.setState({
                showSpinner: false,
                message: result.data.message,
                showMessagePopup: true,
                showBackdrop: true,
                showSignin: false
            });
            if (result.status === 201) {
                localStorage.setItem("urlShortnertoken", result.data.usertoken);
            }
        } catch (error) {

        }

    }

    // @@ handle sign up form values and set to the state
    signUpFormValuesHandler = (event) => {

        const updatedSignupForm = { ...this.state.signUpForm };
        const updatedSignupFormName = { ...updatedSignupForm.name };
        const updatedSignupFormEmail = { ...updatedSignupForm.email };
        const updatedSignupFormPassword = { ...updatedSignupForm.password };
        // @@ get name of user
        if (event.target.name === "signupName") {
            updatedSignupFormName.value = event.target.value;
            updatedSignupFormName.touched = true;
            updatedSignupFormName.valid = checkValidity(
                updatedSignupFormName.value, updatedSignupFormName.validation
            );
        }
        // @@ get email of user
        else if (event.target.name === "signupEmail") {
            updatedSignupFormEmail.value = event.target.value;
            updatedSignupFormEmail.touched = true;
            updatedSignupFormEmail.valid = checkValidity(
                updatedSignupFormEmail.value, updatedSignupFormEmail.validation
            );
        }
        // @@ get password of user
        else if (event.target.name === "signupPassword") {
            updatedSignupFormPassword.value = event.target.value;
            updatedSignupFormPassword.touched = true;
            updatedSignupFormPassword.valid = checkValidity(
                updatedSignupFormPassword.value, updatedSignupFormPassword.validation
            );
        }
        // @@ validate values
        const signupFormIsValid = updatedSignupFormName.valid && updatedSignupFormEmail.valid && updatedSignupFormPassword.valid;

        // @@ chain to the old values
        updatedSignupForm.name = updatedSignupFormName;
        updatedSignupForm.email = updatedSignupFormEmail;
        updatedSignupForm.password = updatedSignupFormPassword;

        this.setState({ signUpForm: updatedSignupForm, signupFormIsValid: signupFormIsValid });
    }

    // @@ send request to the backend
    submitSignupFormHandler = async () => {
        this.setState({ showSpinner: true });
        const newuser = {};
        // @@ get user info from state and send to the backend
        for (let identifier in this.state.signUpForm) {
            newuser[identifier] = this.state.signUpForm[identifier].value;
        }
        // @@ send http request
        const result = await axios.post('http://localhost:8080/user/signup', newuser);
        this.setState({
            showSpinner: false,
            message: result.data.message,
            showMessagePopup: true,
            showBackdrop: true,
            showSignupForm: false
        });


    }
    // @@ shows backdrop and sign up form
    showSignupFormHandler = () => {
        this.setState({
            showBackdrop: true,
            showSignupForm: true,
            showSignin: false,
            showSideDrawer: false
        });
    }
    // @@ hides all over components
    onCancelHandler = () => {
        this.setState({
            showBackdrop: false,
            showSignupForm: false,
            showSignin: false,
            showSideDrawer: false,
            showMessagePopup: false,
            showMyUrls: false,
            message: null,
            loadMyUrls: false,
            showSpinner: false,
        });
    }
    // @@ shows backdrop and sign in form
    showSigninFormHandler = () => {
        this.setState({
            showBackdrop: true,
            showSignin: true,
            showSideDrawer: false,
            showMessagePopup: false,
            showSignupForm: false,
            showMyUrls: false,
            message: null,
            loadMyUrls: false,
        });
    }
    // @@ shows my urls and backdrop
    showMyUrlsHandler = () => {
        this.setState({
            showBackdrop: true,
            loadMyUrls: true,
            showMyUrls: true,
            showSignin: false,
            showSideDrawer: false,
            showMessagePopup: false,
            showSignupForm: false,
            message: null,
        })
    }
    // @@ invoke delete function to delete all urls related to this client
    deleteHistory = () => {
        deleteMyUrls();
        this.onCancelHandler();
    }
    // @@ shows backdrop and sidebar
    showSideDrawerHandler = () => {
        this.setState({
            showBackdrop: true,
            showSideDrawer: true
        });
    }

    // @@ logout function that clears the local storage
    logout = () => {
        localStorage.clear();
        this.setState({ componentShouldUpdateOnce: 0, userLoggedIn: false });
    }

    render() {
        return (
            <div>

                {/* if there is need of spinner so show it */}
                {this.state.showSpinner ?
                    <Spinner show={this.state.showSpinner} />
                    : ''
                }

                {/* if user wants to check all related urls */}
                {this.state.loadMyUrls ? <MyURLs
                    show={this.state.loadMyUrls}
                    cancel={this.onCancelHandler}
                    delete={this.deleteHistory}
                /> : ''}

                {/* if there is need of showing pop up */}
                {this.state.showMessagePopup ?
                    <Attention
                        show={this.state.showMessagePopup}
                        ok={this.onCancelHandler}
                        message={this.state.message}
                    />
                    : ''
                }

                {/* if there is need of side bar */}
                {
                    this.state.showSideDrawer ?
                        this.state.userLoggedIn ?
                            <SideDrawer
                                isAuthenticated={this.state.userLoggedIn}
                                show={this.state.showSideDrawer}
                                myurls={this.showMyUrlsHandler}
                                logout={this.logout}
                                onClick={this.componentDidUpdate}
                            />
                            :
                            <SideDrawer
                                isAuthenticated={this.state.userLoggedIn}
                                show={this.state.showSideDrawer}
                                signin={this.showSigninFormHandler}
                                signup={this.showSignupFormHandler}
                            />
                        : ''
                }

                {/* show backdrop */}
                {this.state.showBackdrop ?
                    <Backdrop
                        show={this.state.showBackdrop}
                        onClick={this.onCancelHandler}
                    />
                    : ''
                }

                {/* show sign up form if needed */}
                <Signup
                    show={this.state.showSignupForm}
                    cancel={this.onCancelHandler}
                    onChange={(event) => { this.signUpFormValuesHandler(event) }}
                    onSubmit={this.submitSignupFormHandler}
                    nameInvalid={!this.state.signUpForm.name.valid}
                    emailInvalid={!this.state.signUpForm.email.valid}
                    passwordInvalid={!this.state.signUpForm.password.valid}
                    nameTouched={this.state.signUpForm.name.touched}
                    emailTouched={this.state.signUpForm.email.touched}
                    passwordTouched={this.state.signUpForm.password.touched}
                    disabled={!this.state.signupFormIsValid}
                />

                {/* show sign in form if needed */}
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
                    {/* show logo and navigation links */}
                    <Logo />

                    {
                        this.state.userLoggedIn ?
                            // if user is logged in then show myurls and logout button
                            <NavigationItems
                                isAuthenticated={this.state.userLoggedIn}
                                className="ToolbarNavigationItems"
                                myurls={this.showMyUrlsHandler}
                                logout={this.logout}
                            /> :
                            // @@ if user is not logged in then show sign in and sign up 
                            <NavigationItems
                                isAuthenticated={this.state.userLoggedIn}
                                className="ToolbarNavigationItems"
                                signin={this.showSigninFormHandler}
                                signup={this.showSignupFormHandler}
                            />
                    }

                    {/* show toggle button on mobile size */}
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