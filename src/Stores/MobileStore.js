import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    mobileMenuIsActive:false,
    filterIsActive: false
}

export const categoriesSlice = createSlice({
    name: 'mobile',
    initialState,
    reducers: {
        setMobileMenuIsActive : (state,{payload}) => {
            state.mobileMenuIsActive = payload
        },
        setFilterIsActive : (state,{payload}) => {
            state.filterIsActive = payload
        }
    }
})


export const {setFilterIsActive, setMobileMenuIsActive} = categoriesSlice.actions

export default categoriesSlice.reducer

