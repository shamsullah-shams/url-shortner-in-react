import React from "react";
import axios from "axios";
import QRCode from 'qrcode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faDiamondTurnRight,
    faSquareShareNodes,
    faQrcode
} from "@fortawesome/free-solid-svg-icons";
import Input from "../../component/UI/Input/Input";
import Label from "../../component/UI/Label/Label";
import Button from "../../component/UI/Button/Button";
import Content from "../../component/Content/Content";
import BackgroundImage from "../../component/UI/BackgroundImage/BackgroundImage";
import CopyForm from "../../component/Popup/CopyURL";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Icons from "../../component/UI/Icons/Icons";
import Attention from "../../component/Popup/Attention";
import checkValidity from "../../checkValidity";
import Spinner from "../../component/UI/Spinner/Spinner";
import "./Form.css";

class Form extends React.Component {

    state = {
        showSpinner: false,
        shortUrl: '',
        longUrl: {
            value: '',
            validation: {
                required: true,
                minlength: 5,
            },
            valid: false,
            touched: false,
        },
        showCopyForm: false,
        showBackDrop: false,
        showSharePopup: false,
        token: '',
        showMessagePopup: false,
        message: '',
        formIsValid: false,
    }


    // @@ gets long url from input of form
    onChangeHandler = (event) => {
        const updateLongURL = { ...this.state.longUrl };
        updateLongURL.value = event.target.value;
        updateLongURL.touched = true;
        updateLongURL.valid = checkValidity(
            updateLongURL.value, updateLongURL.validation
        );

        const formIsValid = updateLongURL.valid;
        this.setState({ longUrl: updateLongURL, formIsValid: formIsValid })
    }

    // @@ send long url to backend and short url 
    onSubmitHandler = async (event) => {
        event.preventDefault(event);
        this.setState({ showSpinner: true });
        // @@ get long url from state
        let check = this.state.longUrl.value;
        let longURL = '';
        // @@ get the current path
        const currentHostName = window.location.href.split('?')[0];
        // @@ check if user is logged in --- url should be relate to this user ----
        const usertoken = localStorage.getItem('urlShortnertoken');
        // @@ checks if long url does not start with http or https so add http to the start of the url
        if (check.startsWith('http:') || check.startsWith('https:')) {
            longURL = check;
        } else {
            longURL = "https://" + check;
        }


        try {
            // @@ send long url and get short url
            const result = await axios.post('http://localhost:8080/url/create/shortUrl', {
                longURL: longURL,
                currentHostName: currentHostName,
                userId: usertoken,
            });
            // @@ get token from short url and store it in state
            const token = result.data.shortUrl.split('/')[3];
            this.setState({
                showSpinner: false,
                shortUrl: result.data.shortUrl,
                token: token,
                message: result.data.message,
                showMessagePopup: true,
                showBackDrop: true,

            });
        } catch (error) {
        }

    }

    // @@ copy the short url
    copyUrlHandler = async () => {
        this.setState({ showBackDrop: false, showCopyForm: false });
    }

    // @@ show the copy component to the user
    copyDecisionHandler = () => {
        this.setState({ showBackDrop: true, showCopyForm: true });
    }

    // @@ generate qr code and download it 
    createQRCode = async () => {
        const qrImage = await QRCode.toDataURL(this.state.shortUrl);
        const ancerTag = document.createElement('a');
        ancerTag.href = qrImage;
        ancerTag.download = `${this.state.shortUrl}-QR-Code`;
        ancerTag.click();
        return;
    }

    // @@ show the share component to the user
    shareURLHandler = () => {
        this.setState((prevState) => ({
            showSharePopup: !prevState.showSharePopup
        }));
    }

    // @@ redirect to the current path + token from state
    redirectToShortUrl = () => {
        window.open(this.state.token);
    }

    // @@ hides all extra components
    cancelHandler = () => {
        this.setState({
            showSharePopup: false,
            showSpinner: false,
            showBackDrop: false,
            showCopyForm: false,
            showMessagePopup: false,
            message: null,
        });
    }

    // @@ hides share component
    shareURLCloseHandler = () => {
        this.setState({ showSharePopup: false });
    }

    render() {
        // @@ if there is no short url
        let form = '';
        if (this.state.shortUrl === '') {
            form =
                <div>
                    <form className="Form Single-Form-Only" onSubmit={this.onSubmitHandler}>
                        <Label>Enter Long URL</Label>
                        <Input onChange={this.onChangeHandler} placeholder="Please Enter a valid Long URL" />
                        <Button disabled={!this.state.formIsValid} className="Submit">Submit</Button>
                    </form>
                </div>
        } else {
            // if short url exist
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
                            <Input value={this.state.shortUrl} readOnly />
                            <Button disable className="Submit">Shorten Another</Button>
                        </form>

                        {/* redirect button */}
                        <Button className="Go" onClick={this.redirectToShortUrl}>
                            <FontAwesomeIcon icon={faDiamondTurnRight} />
                        </Button>

                        {/* copy url button */}
                        <Button onClick={this.copyDecisionHandler} className="Go">
                            <FontAwesomeIcon icon={faCopy} />
                        </Button>

                        {/* qr code generator button */}
                        <Button onClick={this.createQRCode} className="Go">
                            <FontAwesomeIcon icon={faQrcode} />
                        </Button>

                        {/* showing share options component */}
                        <Button onClick={this.shareURLHandler} className="Go">
                            <FontAwesomeIcon icon={faSquareShareNodes} />
                        </Button>
                        <Icons closed={this.shareURLCloseHandler} url={this.state.shortUrl} show={this.state.showSharePopup} />
                    </div>
                </div>
        }
        return (
            <BackgroundImage>
                {this.state.showSpinner ?
                    <Spinner show={this.state.showSpinner} />
                    : ''
                }
                {this.state.showMessagePopup ?
                    <Attention
                        show={this.state.showMessagePopup}
                        message={this.state.message}
                        ok={this.cancelHandler}
                    />
                    : ''
                }

                {this.state.showCopyForm ?
                    <CopyForm
                        value={this.state.shortUrl}
                        show={this.state.showCopyForm}
                        copy={this.copyUrlHandler}
                        cancel={this.cancelHandler}
                    />
                    : ''
                }
                {this.state.showBackDrop ?
                    <Backdrop
                        show={this.state.showBackDrop}
                        onClick={this.cancelHandler}
                    />
                    : ''
                }
                <Content />
                {form}
            </BackgroundImage>
        )
    }

}


export default Form;