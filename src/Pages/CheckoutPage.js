import Steps from "../Components/checkout/Steps";
import Details from "../Components/checkout/Details";
import Header from "../Components/header/Header";
import Footer from "../Components/Footer/Footer";

function CheckoutPage() {
    return (
        <>
            <Header/>
            <div className="main checkout">
                <div className={"page-content pt-7 pb-10 mb-10"}>
                    <Steps/>
                    <div className="container mt-7">
                        <form action="#" className="form">
                            <div className="row">
                                <Details/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default CheckoutPage