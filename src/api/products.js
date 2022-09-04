import axios from "./index";

const prefix = 'product'

const getProduct = (endpoint = '',params) => {
    return axios.get(`${prefix}${endpoint}`, {params})
}
const getPopularProducts = (count) => {
    return axios.get(`${prefix}/random-${prefix}s?count=${count}`)
}

const getProductById = id => {
    return axios.get(`${prefix}/${id}`)
}

export default {
    getProduct,
    getPopularProducts,
    getProductById
}