import {createSlice} from '@reduxjs/toolkit'
import User from "../api/user";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        },
    }
})

export const {
    setUser
} = userSlice.actions

export default userSlice.reducer

export const getUserData = () => {
    return async dispatch => {
        try {
            const {data} = await User.getUser()
            return data?.data
        } catch (e) {

        }
    }
}

