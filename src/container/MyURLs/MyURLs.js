import React from "react";
import axios from "axios";
import "./MyURLs.css";



class MyURLs extends React.Component {

    state = {
        request : 0,
        myurls : null,
    }

    getLongURL = async () => {
        let myurls = '';
        const token = {
            usertoken : localStorage.getItem('urlShortnertoken')
        }

        if(!token) {
            myurls = (
                <div>
                    <center>
                         sign in please....
                    </center>
                </div>
            )
        } else {
            const result = await axios.post('http://localhost:8080/user/getHistory' , token);

            if(!result.data.allurls) {
                myurls =  (
                    <div>
                        <center>
                            No History In the database
                        </center>
                    </div>
                )
            } else {
                myurls = result.data.allurls.map((item) => {
                    return (
                        <div>
                            <div className="SingleBox">
                                <label>longUrl</label>
                                <input readOnly value={item.originalUrl} />
                                <label>shortUrl</label>
                                <input readOnly value={item.shortUrl}/>
                            </div>
                        </div>
                    )
                })
            }
        }
       this.setState({myurls : myurls ,request : 1});
    }

    render() {

        if(this.state.request === 0) {
            this.getLongURL();
        }
    
        let attatchedClassess = 'Hide';
        if(this.props.show) {
            attatchedClassess = '';
        }
    
        return (
            <div className={attatchedClassess}>
                <div className="GetAllHistory">
                    <div onClick={this.props.cancel} className="CloseSideBar">
                        X
                    </div>
                    <div className="ExternalDiv">
                        {this.state.myurls}
                    </div>
                    
                </div>
            </div>
        )
    }
}



export default MyURLs;