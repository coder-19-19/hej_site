import {createSlice} from '@reduxjs/toolkit'
import ProductService from "../api/products"

const initialState = {
    products: [],
    popularProducts : [],
    loading: false,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setPopularProducts:(state,{payload}) => {
            state.popularProducts = payload
        },
        setProducts:(state,{payload}) => {
            state.products = payload
        },
        setLoading:(state,{payload}) => {
            state.loading = payload
        },
    }

})

export const {setPopularProducts,setProducts,setLoading,setTotal} = productsSlice.actions

export default productsSlice.reducer

export const getHomeData = () => {
    return async dispatch => {
        try {
            const [popularProducts] = await Promise.all([ProductService.getPopularProducts(4)])
            dispatch(setPopularProducts(popularProducts?.data?.data))
        }catch (e) {

        }
    }
}
export const getProducts = (filterData) => {
    return async dispatch => {
        try {
            const [products] = await Promise.all([ProductService.getProduct('',filterData)])
            dispatch(setProducts(products?.data?.data))
        }catch (e) {

        }
    }
}