import React from "react";
import axios from "axios";
import Attention from "../../component/Popup/Attention";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Signup from "../../component/Popup/Signup";

class SignupForm extends React.Component {

    state = {
        name : '',
        email : '',
        username : '',
        showBackdrop : false,
        showPopup : false,
        showSignUpForm : true,
    }
   
    InputonChangeHandler = (event) => {
        if(event.target.name === 'name') {
            this.setState({name : event.target.value});
        } else if(event.target.name === 'email') {
            this.setState({email : event.target.value});
        }
    }

    OKHandler = () => {
        this.setState({showBackdrop : false , showPopup : false})
    }

    signupFormOnSubmitHandler = async () => {
        const newUser = {
            name : this.state.name,
            email : this.state.email,
        }
        try {
            const result = await axios.post('http://localhost:8080/user/create' , newUser);
            console.log(result.data.token);
            console.log(result.data.message)
            if(result.data.token) {
                this.setState({username : result.data.token});
                this.setState({showPopup : true, showSignUpForm : false,showBackdrop : true});
                setTimeout(() => {
                    this.setState({showPopup : false});
                }, 20000);
            } else {
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let classess = '';
        if(this.state.showPopup) {
            classess = ['CopyURL' , this.props.className , 'Hide'];
        }
        else if(this.props.show) {
            classess = ['CopyURL' , this.props.className , 'Show'];
        }

        else {
            classess = ['CopyURL' , this.props.className , 'Hide'];
        }


        return (
            <div>
                <Backdrop onClick={this.OKHandler} show={this.state.showBackdrop} />
                <Attention ok={this.OKHandler} username={this.state.username} show={this.state.showPopup}/>
                <Signup show={this.state.showSignUpForm} />
            </div>
        )
    }
}

export default SignupForm;