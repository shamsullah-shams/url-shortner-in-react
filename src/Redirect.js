import React , { Component } from "react";
import axios from "axios";
import NotFound from "./notFound";




class Redirect extends Component {

    state = {
        request : 0,
        originalUrl : null,
    }

    getLongURL = async () => {
        const uri = window.location.href;
        const token = uri.split('/')[3];
        const result = await axios.get(`http://localhost:8080/${token}`);
        this.setState((prevState) => ({
            request : !prevState.request + 1,
            originalUrl : result.data.longurl
        })); 
    }

    render() {

        if(this.state.request === 0) {
            this.getLongURL();
        }

        if(this.state.originalUrl !== null) {
            const ancherTag = document.createElement('a');
            ancherTag.href = this.state.originalUrl;
            ancherTag.click();
        }


        return (
            <>
                {this.state.originalUrl ? '' : <NotFound />}
            </>
        )
    }
}

export default Redirect;