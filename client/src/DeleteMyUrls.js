import axios from "axios";


const deleteMyUrls = async () => {
    const token = localStorage.getItem('urlShortnertoken')
    try {
        await axios.post('/user/clearhistory' , {
            usertoken : token,
        })
    } catch (error) {
        
    }
}


export default deleteMyUrls;