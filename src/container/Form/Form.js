import React from "react";
import axios from "axios";
import qrcode from 'qrcode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faDiamondTurnRight } from "@fortawesome/free-solid-svg-icons";
import { faSquareShareNodes } from "@fortawesome/free-solid-svg-icons";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import Input from "../../component/Input/Input";
import Label from "../../component/Label/Label";
import Button from "../../component/Button/Button";
import Content from "../../component/Content/Content";
import BackgroundImage from "../../UI/BackgroundImage/BackgroundImage";
import Backdrop from "../../UI/Backdrop/BackDrop";
import copyForm from "../../component/CopyForm/CopyForm";
import "./Form.css";

class Form extends React.Component {

    state = {
        longUrl : '',
        shortUrl : '',
        showCopyForm : null,
        showBackDrop : null,
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
               const result = await navigator.clipboard.writeText(this.state.shortUrl);
               console.log(result);
            } catch (error) {
                
            }
        }
    }

    createQRCode = async () => {
        const result = await qrcode.toDataURL('some');
        console.log(result);
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
                    <Button onClick={this.copyUrlHandler} className="Go">
                        <FontAwesomeIcon icon={faCopy} />
                    </Button>
                    <Button onClick={this.createQRCode} className="Go">
                        <FontAwesomeIcon icon={faQrcode} />
                    </Button>
                    <Button className="Go">
                        <FontAwesomeIcon icon={faSquareShareNodes} />
                    </Button>
                </div>
            </div>
        }
        return (
            <BackgroundImage>
                <Content />
                { form }
            </BackgroundImage>
        )
    }

}


export default Form;