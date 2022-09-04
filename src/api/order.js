import axios from "./index";

const addOrder = data => {
    return axios.post('order/new',data,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

const getCurrent = id => {
    return axios.get('order/' + id,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

const getUserCurrent = () => {
    return axios.get('order/current',{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

export default {
    addOrder,
    getCurrent,
    getUserCurrent
}