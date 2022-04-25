import React from "react";
import axios from "axios";
import QRCode from 'qrcode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy,
    faDiamondTurnRight,
    faSquareShareNodes,
    faQrcode } from "@fortawesome/free-solid-svg-icons";
import Input from "../../component/UI/Input/Input";
import Label from "../../component/UI/Label/Label";
import Button from "../../component/UI/Button/Button";
import Content from "../../component/Content/Content";
import BackgroundImage from "../../component/UI/BackgroundImage/BackgroundImage";
import CopyForm from "../../component/Popup/CopyURL";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Icons from "../../component/UI/Icons/Icons";
import "./Form.css";

class Form extends React.Component {

    state = {

        shortUrl : '',
        longUrl : {
            value : '',
            validation : {
                required : true,
                minlength : 12,
            },
            valid : false,
            touched : false,
        },
        showCopyForm : false,
        showBackDrop : false,
        showSharePopup: false,
        token : '',
        formIsValid : false,
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

    onChangeHandler = (event) => {

        const updateLongURL = { ...this.state.longUrl };
        updateLongURL.value = event.target.value;
        updateLongURL.touched = true;
        updateLongURL.valid = this.checkValidity(
            updateLongURL.value, updateLongURL.validation
        );

        const formIsValid = updateLongURL.valid;

        this.setState({longUrl : updateLongURL, formIsValid : formIsValid})
    }

    onSubmitHandler = async (event) => {
        event.preventDefault(event);
        const url = { 
            longURL : this.state.longUrl.value
        }
        try {
            const result = await axios.post('http://192.168.43.73:8080/create/shortUrl' , url);
            const token = result.data.shortUrl.split('/')[3];
            this.setState({shortUrl : result.data.shortUrl, token : token});
        } catch (error) {
            console.log(error);
        }
        
    }

    copyUrlHandler = async () => {
        this.setState({showBackDrop : false, showCopyForm : false});
    }

    copyDecisionHandler = () => {
        this.setState({showBackDrop : true , showCopyForm : true});
    }

    createQRCode = async () => {
        const qrImage = await QRCode.toDataURL(this.state.shortUrl);
        const ancerTag = document.createElement('a');
        ancerTag.href = qrImage;
        ancerTag.download = `${this.state.shortUrl}-QR-Code`;
        ancerTag.click();
        return;
    }

    shareURLHandler = () => {
        this.setState((prevState) => ({
            showSharePopup : !prevState.showSharePopup
        })); 
    }
    
    redirectToShortUrl =  () => {
        window.open(this.state.token);
    }




    cancelHandler = () => {
        this.setState({showSharePopup : false , showBackDrop : false , showCopyForm : false});
    }

    shareURLCloseHandler = () => {
        this.setState({showSharePopup : false});
    }

    render() {
        let form = '';
        if(this.state.shortUrl === '') {
            form = 
            <div>
                <form  className="Form Single-Form-Only" onSubmit={this.onSubmitHandler}>
                    <Label>Enter Long URL</Label>
                    <Input onChange={this.onChangeHandler} placeholder="Enter Long URL" />
                    <Button disabled={!this.state.formIsValid } className="Submit">Submit</Button>
                </form>
            </div>
        } else {
            form = 
            <div className="Header-div-for-form">
                <div className="Form">
                    <form onSubmit={this.onSubmitHandler}>
                        <Label>Your Long URL</Label>
                        <Input 
                            value={this.state.longUrl.value} 
                            onChange={this.onChangeHandler} 
                            placeholder="Enter Long URL" 
                        />
                        <Label>ShortUrl</Label>
                        <Input value={this.state.shortUrl} readOnly  />
                        <Button disable className="Submit">Shorten Another</Button>
                    </form>
                    <Button className="Go" onClick={this.redirectToShortUrl}>
                            <FontAwesomeIcon icon={faDiamondTurnRight} />
                        </Button>
                    <Button onClick={this.copyDecisionHandler} className="Go">
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                    <Button onClick={this.createQRCode} className="Go">
                        <FontAwesomeIcon icon={faQrcode} />
                    </Button>
                    <Button onClick={this.shareURLHandler} className="Go">
                        <FontAwesomeIcon icon={faSquareShareNodes} />
                    </Button>
                    <Icons closed={this.shareURLCloseHandler} url={this.state.shortUrl} show={this.state.showSharePopup} />
                </div>
            </div>
        }
        return (
            <BackgroundImage>
                <CopyForm value={this.state.shortUrl} show={this.state.showCopyForm} copy={this.copyUrlHandler} cancel={this.cancelHandler} />
                <Backdrop show={this.state.showBackDrop} onClick={this.cancelHandler} />
                <Content />
                { form }
            </BackgroundImage>
        )
    }

}


export default Form;