import React from 'react';
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import AboutPage from "./Pages/AboutPage";
import OrderPage from "./Pages/OrderPage";
import CategoryPage from "./Pages/CategoryPage";
import {ToastContainer} from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import ProductPage from "./Pages/ProductPage";
import ErrorPage from "./Pages/ErrorPage";
import UserPage from "./Pages/UserPage"
import ContactPage from "./Pages/ContactPage";

function App() {
    return (
        <BrowserRouter>
            <ToastContainer/>
            <ScrollToTop smooth viewBox="0 0 24 24" svgPath="M18 15l-6-6-6 6" color="white"
                         style={{backgroundColor: "#252525"}}/>
            <Routes>
                <Route exact path={"/"} element={<Home/>}/>
                <Route exact path={"/login"} element={<LoginPage/>}/>
                <Route exact path={"/register"} element={<RegisterPage/>}/>
                <Route exact path={"/cart"} element={<CartPage/>}/>
                <Route exact path={"/checkout"} element={<CheckoutPage/>}/>
                <Route exact path={"/about"} element={<AboutPage/>}/>
                <Route exact path={"/thanks/:id"} element={<OrderPage/>}/>
                <Route exact path={"/categories"} element={<CategoryPage/>}/>
                <Route exact path={"/contact"} element={<ContactPage/>}/>
                <Route exact path={"/product/:id"} element={<ProductPage/>}/>
                <Route exact path={"/user"} element={<UserPage/>}/>
                <Route path="/*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
