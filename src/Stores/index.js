import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categoriesStore'
import productsReducer from './productsStore'
import cartReducer from './cartStore'
import mobileReducer from './MobileStore'
import userReducer from './userStore'
import constantReducer from './constantStore'
export default configureStore({
    reducer: {
        categories:categoriesReducer,
        products:productsReducer,
        cart:cartReducer,
        mobile:mobileReducer,
        user:userReducer,
        constant:constantReducer,
    },
})