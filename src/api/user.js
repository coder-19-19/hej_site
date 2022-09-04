import axios from "./index";

const getUser = () => {
    return axios.get('user/current' ,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

const updateUser = data => {
    return axios.put('user/current',data,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

export default {
    getUser,
    updateUser
}