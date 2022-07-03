import axios from "axios";

// @@ send request and delete all urls related to this client
const deleteMyUrls = async () => {
    const token = localStorage.getItem('urlShortnertoken')
    try {
        await axios.post('http://localhost:8080/user/clearhistory', {
            usertoken: token,
        })
    } catch (error) {

    }
}


export default deleteMyUrls;