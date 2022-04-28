import axios from "axios";


const deleteMyUrls = async () => {
    const token = localStorage.getItem('urlShortnertoken')
    try {
        await axios.post('http://localhost:8080/user/clearhistory' , {
            usertoken : token,
        })
    } catch (error) {
        
    }
}


export default deleteMyUrls;