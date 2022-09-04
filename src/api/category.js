import axios from "./index";

const prefix = 'category'

const getCategory = () => {
    return axios.get(`${prefix}`)
}

const getHomeSubCategory = () => {
    return axios.get(`subcategory/random?count=3`)
}

const getHomeCategory = () => {
    return axios.get(`category/random?count=2`)
}

export default {
    getCategory,
    getHomeSubCategory,
    getHomeCategory
}