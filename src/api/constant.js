import axios from "./index";

const getConstants = () => {
    return axios.get('constant')
}

const getBanners = type => {
    return axios.get('main-banner/type/' + type)
}

export default {
    getConstants,
    getBanners
}