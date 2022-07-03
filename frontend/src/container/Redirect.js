import React, { Component } from "react";
import axios from "axios";
import NotFound from "../notFound";




class Redirect extends Component {
    state = {
        request: 0,
        originalUrl: null,
    }

    // @@ get long url from backend if exists
    getLongURL = async () => {
        // @@ take the current path
        const uri = window.location.href;
        // @@ get the token from path
        const token = uri.split('/')[3];
        // @@ send request to backend and get long url if exists
        const result = await axios.get(`http://localhost:8080/url/${token}`);
        this.setState((prevState) => ({
            request: !prevState.request + 1,
            originalUrl: result.data.longurl
        }));
    }

    render() {
        // @@ invoke the request function once
        if (this.state.request === 0) {
            this.getLongURL();
        }
        // @@ if long url exist so redirect otherwise 404
        if (this.state.originalUrl !== null) {
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



