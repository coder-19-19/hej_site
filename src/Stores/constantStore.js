import {createSlice} from '@reduxjs/toolkit'
import User from "../api/user";
import Constant from "../api/constant";

export const userSlice = createSlice({
    name: 'constant',
    initialState: {
        constant: {}
    },
    reducers: {
        setConstant: (state, {payload}) => {
            state.constant = payload
            console.log(state.constant)
        },
    }
})

export const {
    setConstant
} = userSlice.actions

export default userSlice.reducer


export const getConstantData = () => {
    return async dispatch => {
        try {
            const {data} = await Constant.getConstants()
            return data?.data
        } catch (e) {

        }
    }
}
