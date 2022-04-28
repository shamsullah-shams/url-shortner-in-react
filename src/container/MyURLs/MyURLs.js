import React from "react";
import axios from "axios";
import "./MyURLs.css";



class MyURLs extends React.Component {

    state = {
        request : 0,
        myurls : null,
        createForm : false,
        token : null,
    }

    getLongURL = async () => {
        let myurls = '';
        const token = localStorage.getItem('urlShortnertoken')

        if(!token) {
            myurls = (
                <div>
                    <center>
                         sign in please....
                    </center>
                </div>
            )
        } else {
            try {
                const result = await axios.post('/user/getHistory' , {
                    usertoken : token,
                });
    
                if(!result.data.allurls) {
                    myurls =  (
                        <div>
                            <center>
                                No History In the database
                            </center>
                        </div>
                    )
                    this.setState({createForm : false})
                } else {
                    myurls = (
                        result.data.allurls.map((item , index) => {
                            return (
                                <div key={index}>
                                    <div className="SingleBox">
                                        <label>longUrl</label>
                                        <input readOnly value={item.originalUrl} />
                                        <label>shortUrl</label>
                                        <input readOnly value={item.shortUrl}/>
                                    </div>
                                </div>
                            )
                        })
                        
                    ) 
                    this.setState({createForm : true});
                }
            } catch (error) {
                
            }
        }
       this.setState({myurls : myurls ,request : 1, token : token});
    }

    render() {

        if(this.state.request === 0) {
            this.getLongURL();
        }
    
        return (
            <div >
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