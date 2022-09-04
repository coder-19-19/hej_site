import axios from "./index";

const getBaskets = (id) => {
    return axios.get('basket/' + id,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

const addBasket = data => {
    return axios.post('basket-item',data,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

const deleteBasket = id => {
    return axios.delete('basket-item/' + id,{
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}

export default {
    getBaskets,
    addBasket,
    deleteBasket
}