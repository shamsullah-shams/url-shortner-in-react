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
import CopyForm from "../../component/CopyURL/CopyURL";
import Backdrop from "../../component/UI/Backdrop/Backdrop";
import Icons from "../../component/UI/Icons/Icons";
import "./Form.css";

class Form extends React.Component {

    state = {
        longUrl : '',
        shortUrl : '',
        showCopyForm : false,
        showBackDrop : false,
        showSharePopup: false,
    }

    onChangeHandler = (event) => {
        this.setState({longUrl : event.target.value});
    }

    onSubmitHandler = async (event) => {
        event.preventDefault(event);
        if(this.state.longUrl !== '') {
            const url = {
                url : this.state.longUrl
            };
            try {
                const result = await axios.post('http://localhost:8080/create/shortUrl' , url);
                this.setState({shortUrl : result.data.shortUrl});     
            } catch (error) {
                console.log(error);
            }
        }
    }

    copyUrlHandler = async () => {
        if(this.state.shortUrl !== '') {
            try {
               await navigator.clipboard.writeText(this.state.shortUrl);
               this.setState({showBackDrop : false, showCopyForm : false})
            } catch (error) {
                
            }
        }
    }

    copyDecisionHandler = () => {
        this.setState({showBackDrop : true , showCopyForm : true});
    }

    cancelCopyURLHandler = () => {
        this.setState({showBackDrop : false, showCopyForm : false});
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
                    <Button className="Submit">Submit</Button>
                </form>
            </div>
        } else {
            form = 
            <div className="Header-div-for-form">
                <div className="Form">
                    <form onSubmit={this.onSubmitHandler}>
                        <Label>Your Long URL</Label>
                        <Input value={this.state.longUrl} onChange={this.onChangeHandler} placeholder="Enter Long URL" />
                        <Label>ShortUrl</Label>
                        <Input value={this.state.shortUrl} readOnly  />
                        <Button disable className="Submit">Shorten Another</Button>
                    </form>
                    <Button className="Go">
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
                <CopyForm value={this.state.shortUrl} show={this.state.showCopyForm} copy={this.copyUrlHandler} cancel={this.cancelCopyURLHandler} />
                <Backdrop show={this.state.showBackDrop} onClick={this.cancelCopyURLHandler} />
                <Content />
                { form }
            </BackgroundImage>
        )
    }

}


export default Form;