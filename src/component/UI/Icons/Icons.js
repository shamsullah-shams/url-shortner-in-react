import React from "react";
import { FacebookIcon,
        WhatsappIcon,
        TelegramIcon,
        EmailIcon,
        LinkedinIcon,
        FacebookMessengerIcon,
        ViberIcon,
        TwitterIcon,
        InstapaperIcon,
        FacebookShareButton,
        WhatsappShareButton,
        TelegramShareButton,
        EmailShareButton ,
        LinkedinShareButton,
        FacebookMessengerShareButton,
        ViberShareButton,
        TwitterShareButton} from "react-share";
import "./Icons.css";
const icons = (props) => {

    let classes = ['IconsPopup' , 'Hide'];
    if(props.show) {
        classes = ['IconsPopup' , 'Show']
    }

    return (
        <div  className={classes.join(' ')} >
            <div onClick={props.closed} className="CROSS">
                X
            </div>
            <div className="SCROLL">
                <FacebookShareButton url={props.url} className="Icons">
                    <FacebookIcon  size={32} round={true} />
                </FacebookShareButton>
                <WhatsappShareButton url={props.url} className="Icons">
                    <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <TelegramShareButton url={props.url} className="Icons">
                    <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
                <EmailShareButton url={props.url} className="Icons">
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
                <LinkedinShareButton url={props.url} className="Icons">
                    <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <FacebookMessengerShareButton url={props.url} className="Icons">
                    <FacebookMessengerIcon size={32} round={true} />
                </FacebookMessengerShareButton>
                <ViberShareButton  url={props.url} className="Icons">
                    <ViberIcon size={32} round={true}/>
                </ViberShareButton>
                <TwitterShareButton url={props.url} className="Icons">
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
            </div>
        </div>
    )
}


export default icons;