import React from "react";
import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";
import {Link} from "react-router-dom";
import {BiErrorCircle} from "react-icons/bi"

function ErrorPage() {
    return (
        <>
            <Header/>
            <div className="mt-7 d-flex justify-content-center flex-column align-items-center">
                <h2>Səhifə tapılmadı</h2>
                <BiErrorCircle color="#ff675d" size={70}/>
                <div className="cart-actions ml-4 mt-4">
                    <Link to="/" className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4"><i
                        className="d-icon-arrow-left"></i>ALIŞ-VERİŞƏ DAVAM ET</Link>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default ErrorPage