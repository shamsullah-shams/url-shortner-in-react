import React from "react";
import axios from "axios";
import Spinner from "../../component/UI/Spinner/Spinner";
import "./MyURLs.css";



class MyURLs extends React.Component {

    state = {
        showSpinner: false,
        request: 0,
        myurls: null,
        createForm: false,
        token: null,
    }

    getLongURL = async () => {
        let myurls = '';
        // @@ get user id from local storage
        const token = localStorage.getItem('urlShortnertoken')

        if (!token) {
            myurls = (
                <div>
                    <center>
                        sign in please....
                    </center>
                </div>
            )
        } else {
            try {
                this.setState({ showSpinner: true });
                // @@ send request to get the user related urls
                const result = await axios.post('http://localhost:8080/user/getHistory', {
                    usertoken: token,
                });
                if (!result.data.allurls) {
                    myurls = (
                        <div>
                            <center>
                                No History In the database
                            </center>
                        </div>
                    )
                    this.setState({ createForm: false, showSpinner: false, })
                } else {
                    // @@ convert all urls to jsx
                    myurls = (
                        result.data.allurls.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="SingleBox">
                                        <label>longUrl</label>
                                        <input readOnly value={item.originalUrl} />
                                        <label>shortUrl</label>
                                        <input readOnly value={item.shortUrl} />
                                    </div>
                                </div>
                            )
                        })

                    )
                    this.setState({ createForm: true, showSpinner: false });
                }
            } catch (error) {

            }
        }
        this.setState({ myurls: myurls, request: 1, token: token });
    }

    render() {
        // @@ send request once to backend
        if (this.state.request === 0) {
            this.getLongURL();
        }

        return (
            <div >
                {
                    this.state.showSpinner ? <Spinner show={this.state.showSpinner} />
                        : ''
                }
                <div className="GetAllHistory">
                    <div onClick={this.props.cancel} className="CloseSideBar">
                        X
                    </div>
                    <div className="ExternalDiv">
                        {this.state.myurls}
                    </div>
                    {
                        this.state.createForm ?
                            <div className="DeleteHistoryDiv">
                                <button onClick={this.props.delete} className="DeleteHistoryButton">Delete History</button>
                            </div> : null
                    }
                </div>
            </div>
        )
    }
}



export default MyURLs;