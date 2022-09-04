import {createSlice} from '@reduxjs/toolkit'
import CategoriesService from '../api/category'

const initialState = {
    categories: [],
    subCategories: [],
    minPrice: 0,
    maxPrice: 0
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, {payload}) => {
            state.categories = payload
        },
        setSubCategories: (state, {payload}) => {
            state.subCategories = payload
        },
        setMinPrice : (state,{payload}) => {
            state.minPrice = payload
        },
        setMaxPrice : (state,{payload}) => {
            state.maxPrice = payload
        }
    }
})


export const {setCategories,setMaxPrice,setMinPrice} = categoriesSlice.actions

export default categoriesSlice.reducer

export const getCategories = () => {
    return async dispatch => {
        try {
            const {data} = await CategoriesService.getCategory()
            dispatch(setCategories(data?.data))
        } catch (e) {

        }
    }
}