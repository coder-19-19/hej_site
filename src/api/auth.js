import axios from "./index";

const login = data => {
    return axios.post('auth/login',data)
}
const register = data => {
    return axios.post('auth/register',data)
}

const changePassword = data => {
    return axios.put('auth/current/password',data, {
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
}

export default {
    login,
    register,
    changePassword
}